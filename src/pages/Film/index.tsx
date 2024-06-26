import { Button, Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { fetchQuery } from "../../features/api";
import { useNavigate, useParams } from "react-router-dom";
import { ActorsList } from "../../components/ActorsList";
import useWindowDimensions from "../../features/hooks/useWindowDimensions";
import { ReviewsList } from "../../components/ReviewsList";
import { SimilarMoviesList } from "../../components/SimilarMoviesList";
import { PostersList } from "../../components/PostersList";
import { SeriesList } from "../../components/SeriesList";
import { FilmType } from "../../features/types";

export const Film = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const { height, width } = useWindowDimensions();

  const handlescreenWidthChange = (width) => {
    if (width < 480) return 1;
    if (width < 768) return 2;
    if (width < 1200) return 3;
    return 4;
  };

  const [movieData, setMovieData] = useState({
    data: {} as FilmType,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchQuery(`v1.4/movie/${id}`);
      if (response.error)
        setMovieData({ data: {}, loading: false, error: true });
      else setMovieData({ data: response.data, loading: false, error: false });
    };

    fetchData();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Button onClick={handleGoBack}>Назад</Button>
      {!movieData.loading && !movieData.error && (
        <>
          <Row gutter={64}>
            <Col span={24}>
              <h1>{movieData.data.name}</h1>
              <p>{movieData.data.description}</p>
            </Col>
            <Divider />
            <Col span={24}>
              <PostersList
                mainPoster={movieData.data.poster}
                movieId={movieData.data.id}
                limit={1}
              />
            </Col>
            <Divider />
            <Col span={24}>
              <p>
                Рейтинг фильма: <span>{movieData.data.rating.kp}</span>
              </p>
            </Col>
            <Divider />
            <Col span={24}>
              <h2>Актёры</h2>
              {movieData.data.persons.filter(
                (obj) => obj.profession == "актеры"
              ).length > 0 ? (
                <ActorsList
                  limit={handlescreenWidthChange(width)}
                  items={movieData.data.persons.filter(
                    (obj) => obj.profession == "актеры"
                  )}
                />
              ) : (
                <h3>Актёров не найдено</h3>
              )}
            </Col>
            <Divider />
            <Col span={24}>
              <h2>Отзывы</h2>
              <ReviewsList
                limit={handlescreenWidthChange(width)}
                movieId={movieData.data.id}
              />
            </Col>
            <Divider />
            <Col span={24}>
              <h2>Серии и сезоны</h2>
              <SeriesList
                movieId={movieData.data.id}
                limit={handlescreenWidthChange(width)}
              />
            </Col>
            <Divider />
            <Col span={24}>
              <h2>Похожие фильмы и сериалы</h2>
              {movieData.data.similarMovies.length > 0 ? (
                <SimilarMoviesList
                  items={movieData.data.similarMovies}
                  limit={handlescreenWidthChange(width)}
                />
              ) : (
                <h3>Похожих фильмов не найдено</h3>
              )}
            </Col>
            <Divider />
          </Row>
        </>
      )}
    </>
  );
};
