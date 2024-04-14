import { Button, Card, Col, Divider, Modal, Pagination, Row } from "antd";
import { useEffect, useState } from "react";
import { fetchQuery } from "../../features/api";

interface SeasonType {
  id?: number;
  number?: number;
  episodesCount?: number;
  episodes?: {
    number?: number;
    name?: string;
    still?: {
      previewUrl?: string;
      url?: string;
    };
  }[];
}

interface FlattenSeriesType {
  seasonId?: number;
  seasonNumber?: number;
  episodeNumber?: number;
  still?: {
    previewUrl?: string;
    url?: string;
  };
  episodeName?: string;
}

interface SeasonsListType {
  docs?: SeasonType[];
  total?: number;
}

export const SeriesList = ({
  limit,
  movieId,
}: {
  limit: number;
  movieId: number;
}) => {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({
    open: false,
    review: {} as SeasonsListType,
  });

  const handlePageChange = (page, pageSize) => {
    setPage(page);
  };

  const [seasonData, setSeasonData] = useState({
    data: {} as SeasonsListType,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchQuery(
        `v1.4/season?page=${page}&limit=${250}&movieId=${movieId}`
      );
      if (response.error)
        setSeasonData({ data: {}, loading: false, error: true });
      else setSeasonData({ data: response.data, loading: false, error: false });
    };

    fetchData();
  }, [movieId]);

  const getFlattenSeriesInfo = (
    seasons: SeasonsListType
  ): FlattenSeriesType[] => {
    const flattenSeries = [];

    seasons.docs
      .sort((a, b) => a.number - b.number)
      .map((season) =>
        season.episodes.map((episode) => {
          flattenSeries.push({
            seasonId: season.id,
            seasonNumber: season.number,
            episodeNumber: episode.number,
            still: episode.still,
            episodeName: episode.name,
          });
        })
      );
    return flattenSeries;
  };

  return (
    <>
      {!seasonData.error && !seasonData.loading && (
        <>
          {getFlattenSeriesInfo(seasonData.data).length > 0 ? (
            <>
              {getFlattenSeriesInfo(seasonData.data).length > limit && (
                <>
                  <Pagination
                    showSizeChanger={false}
                    onChange={handlePageChange}
                    current={page}
                    pageSize={limit}
                    total={getFlattenSeriesInfo(seasonData.data).length}
                  />
                  <Divider dashed={false} />
                </>
              )}
              <Row gutter={12}>
                {getFlattenSeriesInfo(seasonData.data)
                  .slice((page - 1) * limit, page * limit)
                  .map((obj) => (
                    <Col
                      key={obj.seasonId + obj.episodeNumber}
                      span={24 / limit}
                    >
                      <Card
                        cover={obj?.still?.previewUrl && <img src={obj.still.previewUrl} />}
                        styles={{ body: { height: "100%" } }}
                        style={{
                          height: "100%",
                        }}
                      >
                        <div>
                          <h4 style={{ color: "gray" }}>
                            Сезон {obj.seasonNumber}
                          </h4>
                          <h3>
                            Эпизод {obj.episodeNumber} - {obj.episodeName}
                          </h3>
                        </div>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </>
          ) : (
            <h3>Серий не найдено</h3>
          )}
        </>
      )}
    </>
  );
};
