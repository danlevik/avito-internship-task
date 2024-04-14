import { Card, Col, Divider, Pagination, Row } from "antd";
import { useState } from "react";

export const ActorsList = ({
  items,
  limit,
}: {
  items: {
    id: number;
    photo: string;
    name: string;
    enName: string;
    description: string;
    profession: string;
  }[];
  limit: number;
}) => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page, pageSize) => {
    setPage(page);
  };


  return (
    <>
      {items.length > limit && (
        <>
          <Pagination
            onChange={handlePageChange}
            current={page}
            pageSize={limit}
            total={Math.ceil(items.length)}
          />
          <Divider dashed={false}/>
        </>
      )}
      <Row gutter={12}>
        {items.slice((page - 1) * limit, page * limit).map((obj) => (
          <Col key={obj.id} span={24 / limit}>
            <Card style={{height: "100%"}} cover={<img src={obj.photo}></img>}>
              <div>
                <p>{obj.name}</p>
                <p style={{ color: "gray" }}>{obj.description}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
