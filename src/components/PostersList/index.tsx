import { useEffect, useState } from "react";
import { fetchQuery } from "../../features/api";
import { Carousel } from "../Carousel";
import { Image } from "antd";

interface PosterType {
  id?: number;
  url?: string;
  previewUrl?: string;
}

interface PostersListType {
  docs?: PosterType[];
  total?: number;
  pages?: number;
}

export const PostersList = ({ movieId, limit, mainPoster }) => {
  const [postersData, setPostersData] = useState({
    data: {} as PostersListType,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchQuery(
        `v1.4/image?page=1&limit=250&movieId=${movieId}&type=cover`
      );
      if (response.error)
        setPostersData({ data: {}, loading: false, error: true });
      else
        setPostersData({ data: response.data, loading: false, error: false });
    };

    fetchData();
  }, [movieId]);

  return (
    <>
      {!postersData.error && !postersData.loading && (
        <>
          {postersData.data.docs.concat({...mainPoster, id: 0}).length > 0 ? (
            <Carousel limit={limit}>
              {postersData.data.docs.concat({...mainPoster, id: 0}).map((obj) => (
                <div key={obj.id}
                  style={{
                    width: `${100 / limit}%`,
                    height: "400px",
                    flexShrink: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img alt="Постер" src={obj.url} />
                </div>
              ))}
            </Carousel>
          ) : <h3>Постеров не найдено</h3>}
        </>
      )}
    </>
  );
};
