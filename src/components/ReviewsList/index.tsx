import { Button, Card, Col, Divider, Modal, Pagination, Row } from "antd";
import { useEffect, useState } from "react";
import { fetchQuery } from "../../features/api";
import { ReviewType, ReviewsListType } from "../../features/types";



export const ReviewsList = ({
  limit,
  movieId,
}: {
  limit: number;
  movieId: number;
}) => {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({
    open: false,
    review: {} as ReviewType,
  });

  const handlePageChange = (page, pageSize) => {
    setPage(page);
  };

  const [reviewsData, setReviewsData] = useState({
    data: {} as ReviewsListType,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchQuery(
        `v1.4/review?page=${page}&limit=${limit}&movieId=${movieId}`
      );
      if (response.error)
        setReviewsData({ data: {}, loading: false, error: true });
      else
        setReviewsData({ data: response.data, loading: false, error: false });
    };

    fetchData();
  }, [page, limit, movieId]);

  const handleModalClose = () => {
    setModal({ open: false, review: {} });
  };

  const handleModalOpen = (obj: ReviewType) => {
    setModal({ open: true, review: obj });
  };

  const setReviewColor = (type) => {
    switch (type) {
      case "Позитивный":
        return "#52c41a";
      case "Негативный":
        return "#f5222d";
      default:
        return "#bfbfbf";
    }
  };

  return (
    <>
      <Modal
        open={modal.open}
        onCancel={handleModalClose}
        onOk={handleModalClose}
        footer={<></>}
      >
        <div>
          <p>
            <strong>{modal.review.author}</strong>
          </p>
          <p>{new Date(modal.review.date).toLocaleDateString()}</p>
          <p>
            <strong>{modal.review.title}</strong>
          </p>
          <p>{modal.review.review}</p>
        </div>
      </Modal>
      {!reviewsData.error && !reviewsData.loading && (
        <>
          {reviewsData.data.docs.length > 0 ? (
            <>
              {reviewsData.data.total > limit && (
                <>
                  <Pagination
                    showSizeChanger={false}
                    onChange={handlePageChange}
                    current={page}
                    pageSize={limit}
                    total={reviewsData.data.total}
                  />
                  <Divider dashed={false} />
                </>
              )}
              <Row gutter={12}>
                {reviewsData.data.docs.map((obj) => (
                  <Col key={obj.id} span={24 / limit}>
                    <Card
                      styles={{ body: { height: "100%" } }}
                      style={{
                        height: "100%",
                        borderColor: setReviewColor(obj.type),
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <p>
                            <strong>{obj.author}</strong>
                          </p>
                          <p>{new Date(obj.date).toLocaleDateString()}</p>
                          <p>
                            <strong>{obj.title}</strong>
                          </p>
                          <p>{obj.review.slice(0, 100)}...</p>
                        </div>
                        <Button onClick={() => handleModalOpen(obj)}>
                          Открыть полностью
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <h3>Отзывов не найдено</h3>
          )}
        </>
      )}
    </>
  );
};
