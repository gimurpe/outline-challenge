import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useVirtualizer } from "@tanstack/react-virtual";
import { Box, Flex } from "../../display";
import { Modal } from "../../organisms/Modal/Modal";
import styles from "./styles";
import { IComment } from "outline-challenge-shared/models";
import { useAuth } from "../../../hooks/useAuth";
import { useComments } from "../../../hooks/useComments";
import { Triangle } from "react-loader-spinner";

export const DashboardPage = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    comment: IComment | null;
  }>({
    isOpen: false,
    comment: null,
  });
  const { logOut } = useAuth();
  const { fetchNextComments } = useComments();

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: (ctx) => fetchNextComments(10, ctx.pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextOffset : undefined,
    initialPageParam: 0,
  });

  const allRows = data ? data.pages.flatMap((d) => d?.rows) : [];

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  const onSignOut = () => {
    logOut();
  };

  const onCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const onOpenModal = (commentIndex: number) => {
    setModalState(() => ({ comment: allRows[commentIndex], isOpen: true }));
  };

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  useEffect(() => {
    rowVirtualizer.measure();
  }, [allRows.length]);

  return (
    <Flex className="dashboard-page" css={styles}>
      <button onClick={onSignOut} className="dashboard-page__sign-out-btn">
        Sign Out
      </button>

      <Modal isOpen={modalState.isOpen} onClose={onCloseModal} css={styles}>
        {allRows.length > 0 && modalState.comment ? (
          <Flex className="dashboard-page__modal-content">
            <Box>{modalState.comment.id}</Box>
            <Box>{modalState.comment.name}</Box>
            <Box>{modalState.comment.email}</Box>
            <Box>{modalState.comment.body}</Box>
          </Flex>
        ) : (
          <></>
        )}
      </Modal>
      {status === "pending" ? (
        <Flex className="dashboard-page__loading-indicator">
          <Triangle
            visible={true}
            height="180"
            width="180"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Loading...</p>
        </Flex>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <Flex className="dashboard-page__list-container">
          <Box
            ref={parentRef}
            className="dashboard-page__list"
            data-testid="dashboard-page-list"
          >
            <Box
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const isLoaderRow = virtualRow.index > allRows.length - 1;
                const comment = allRows[virtualRow.index];

                return (
                  <Box
                    key={virtualRow.index}
                    className={
                      virtualRow.index % 2
                        ? "dashboard-page__listItemOdd"
                        : "dashboard-page__listItemEven"
                    }
                    onClick={() => onOpenModal(virtualRow.index)}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {isLoaderRow ? (
                      hasNextPage ? (
                        "Loading more..."
                      ) : (
                        "Nothing more to load"
                      )
                    ) : (
                      <Flex className="dashboard-page__listItem-content">
                        <Box className="dashboard-page__listItem-text">
                          {`${comment.id} | ${comment.name} | ${comment.email}`}
                        </Box>
                        <Box className="dashboard-page__listItem-eye">
                          <i className="fa-regular fa-eye"></i>
                        </Box>
                      </Flex>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};
