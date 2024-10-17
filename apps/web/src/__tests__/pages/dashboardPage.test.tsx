import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DashboardPage } from "../../components/pages/DashboardPage/DashboardPage";
import { commentsClient } from "../../lib/commentsClient";
import { rootReducer, RootState } from "../../redux/store";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

jest.mock("@lib/commentsClient", () => ({
  commentsClient: {
    list: jest.fn(),
  },
}));

const mockComments = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Comment ${i + 1}`,
  email: `comment${i + 1}@example.com`,
  body: `This is the body of comment ${i + 1}`,
}));

const queryClient = new QueryClient();

interface RenderWithStoreOptions {
  initialState?: Partial<RootState>;
}

const renderWithStore = (
  component: React.ReactElement,
  { initialState }: RenderWithStoreOptions = {}
) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  return {
    ...render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>{component}</MemoryRouter>
        </QueryClientProvider>
      </Provider>
    ),
    store,
  };
};

describe("DashboardPage", () => {
  beforeAll(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "root");
    document.body.appendChild(modalRoot);
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 120,
        height: 120,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      } as DOMRect;
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (commentsClient.list as jest.Mock).mockResolvedValueOnce(mockComments);
    renderWithStore(<DashboardPage />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders comments when data is fetched", async () => {
    (commentsClient.list as jest.Mock).mockResolvedValueOnce(mockComments);
    renderWithStore(<DashboardPage />);

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    expect(
      screen.getByText(`1 | Comment 1 | comment1@example.com`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`2 | Comment 2 | comment2@example.com`)
    ).toBeInTheDocument();
  });

  it("opens modal with comment details on click", async () => {
    (commentsClient.list as jest.Mock).mockResolvedValueOnce(mockComments);
    renderWithStore(<DashboardPage />);

    await waitFor(() =>
      expect(screen.getByText(/Comment 1/i)).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText(/Comment 1/i));

    expect(
      screen.getByText(/This is the body of comment 1/i)
    ).toBeInTheDocument();

    const modal = screen.getByTestId("modal");
    const email = within(modal).getByText(/comment1@example.com/i);

    expect(email).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", async () => {
    (commentsClient.list as jest.Mock).mockResolvedValueOnce(mockComments);
    renderWithStore(<DashboardPage />);

    await waitFor(() =>
      expect(screen.getByText(/Comment 1/i)).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText(/Comment 1/i));

    expect(
      screen.getByText(/This is the body of comment 1/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    await waitFor(() =>
      expect(
        screen.queryByText(/This is the body of comment 1/i)
      ).not.toBeInTheDocument()
    );
  });
});
