import {
  Card,
  Carousel,
  Col,
  Divider,
  Image,
  Input,
  Pagination,
  Row,
} from "antd";
import { fetchQuery } from "../../features/api";
import { useEffect, useState } from "react";

import type { MenuProps } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Filters } from "../../components/Filters";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSearchParamsForLocation } from "react-router-dom/dist/dom";
import useWindowDimensions from "../../features/hooks/useWindowDimensions";
import { log } from "console";
import { FilmsListType } from "../../features/types";
import { MovieCard } from "../../components/MovieCard";

export const FilmsList = () => {
  const [moviesData, setMoviesData] = useState({
    data: {} as FilmsListType,
    loading: true,
    error: false,
  });

  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
  });

  const { height, width } = useWindowDimensions();

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const [isFilterSearch, setIsFilterSearch] = useState(
    !searchParams.get("query")
  );

  const getSearchParams = () => {
    let resultQuery = [];
    searchParams.forEach(
      (value, key) => value && resultQuery.push(`${key}=${value}`)
    );

    return resultQuery.length > 0 ? "?" + resultQuery.join("&") : "";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);

      if (query) {
        setIsFilterSearch(false);
        setSearchParams({
          query: query,
          page: String(pagination.page),
          limit: String(pagination.limit),
        });
      } else {
        setIsFilterSearch(true);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      const link = isFilterSearch ? "v1.4/movie" : "v1.4/movie/search";
      const response = await fetchQuery(`${link}${getSearchParams()}`);

      if (response.error)
        setMoviesData({ data: {}, loading: false, error: true });
      else setMoviesData({ data: response.data, loading: false, error: false });
    };

    fetchData();
  }, [searchParams]);

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  const handlePageSizeChange = (current, size) => {
    setPagination({ page: current, limit: size });
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: current,
      limit: size,
    });
  };

  const handlePageChange = (page, pageSize) => {
    setPagination({ limit: pageSize, page: page });
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: page,
      limit: pageSize,
    });
  };

  const handlescreenWidthChange = (width) => {
    if (width < 480) return 24;
    if (width < 768) return 12;
    if (width < 1200) return 8;
    return 6;
  };

  return (
    <>
      <Row gutter={64}>
        <Col span={24}>
          <h2>Поиск по фильтрам</h2>
          <Filters
            setIsFilterSearch={setIsFilterSearch}
            setSearchParams={setSearchParams}
          />
        </Col>

        <Col span={24}>
          <h2>Поиск по названию</h2>
          <Input
            onChange={handleChangeQuery}
            placeholder="Введите название"
            size="large"
          />
        </Col>

        {!moviesData.loading && !moviesData.error && (
          <>
            <Divider />
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Pagination
                onShowSizeChange={handlePageSizeChange}
                pageSize={pagination.limit}
                onChange={handlePageChange}
                showSizeChanger={true}
                current={pagination.page}
                total={moviesData.data.pages}
              />
            </Col>
            <Divider />
            {moviesData.data.docs.map((obj) => {
              return (
                <Col
                  key={obj.id}
                  span={handlescreenWidthChange(width)}
                  style={{ gap: "16px" }}
                >
                  <MovieCard obj={obj} />
                </Col>
              );
            })}
            <Divider />
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Pagination
                onShowSizeChange={handlePageSizeChange}
                pageSize={pagination.limit}
                onChange={handlePageChange}
                showSizeChanger={true}
                current={pagination.page}
                total={moviesData.data.pages}
              />
            </Col>
            <Divider />
          </>
        )}
      </Row>
    </>
  );
};
