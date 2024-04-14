import { Card, Col, Divider, Pagination, Row } from "antd";
import { useState } from "react";
import { FilmCardType } from "../../features/types";
import { MovieCard } from "../MovieCard";
import { Carousel } from "../Carousel";

export const SimilarMoviesList = ({
  items,
  limit,
}: {
  items: FilmCardType[];
  limit: number;
}) => {
  return (
    <>
      <Carousel limit={limit}>
        {items.map((obj) => (
          <div
            style={{
              width: `${100 / limit}%`,
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MovieCard obj={obj} />
          </div>
        ))}
      </Carousel>
    </>
  );
};
