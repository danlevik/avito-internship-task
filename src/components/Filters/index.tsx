import {
  Button,
  Col,
  DatePicker,
  Form,
  Select,
  Slider,
  SliderSingleProps,
} from "antd";
import { useEffect, useState } from "react";
import { fetchQuery } from "../../features/api";
import { SetURLSearchParams } from "react-router-dom";

export const Filters = ({
  setSearchParams,
  setIsFilterSearch,
}: {
  setSearchParams: SetURLSearchParams;
  setIsFilterSearch: Function;
}) => {
  interface PossibleValueType {
    name?: string;
    slug?: string;
  }

  const [possibleCountries, setPossibleCountries] = useState({
    data: [] as PossibleValueType[],
    loading: true,
    error: false,
  });

  const [filters, setFilters] = useState({
    "year": "",
    "countries.name": "",
    "ageRating": "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchQuery(
        "v1/movie/possible-values-by-field?field=countries.name"
      );
      if (response.error)
        setPossibleCountries({ data: [], loading: false, error: true });
      else
        setPossibleCountries({
          data: response.data,
          loading: false,
          error: false,
        });
    };

    fetchData();
  }, []);

  const marks: SliderSingleProps["marks"] = {
    0: "0+",
    3: "3+",
    6: "6+",
    12: "12+",
    18: "18+",
  };

  const handleYearChange = (value: { $y: string }) => {
    setFilters({ ...filters, "year": value?.$y });
  };

  const handleCountryChange = (value: string) => {
    setFilters({ ...filters, "countries.name": value });
  };

  const handleAgeRatingChange = (value: number[]) => {
    setFilters({ ...filters, "ageRating": value.join("-") });
  };

  const handleSearchWithFilters = () => {
    setIsFilterSearch(true);
    setSearchParams(filters);
  };

  return (
    <>
      <Col style={{ display: "flex", justifyContent: "center" }} span={24}>
        <Form variant="outlined" style={{ width: "50%" }} layout="vertical">
          <Form.Item label="Год">
            <DatePicker onChange={handleYearChange} picker="year" />
          </Form.Item>

          <Form.Item label="Страна">
            <Select
              showSearch={true}
              onChange={handleCountryChange}
              style={{ width: "100%" }}
              placeholder="Выберите страну фильма"
              options={
                !possibleCountries.loading && !possibleCountries.error
                  ? possibleCountries.data.map((obj) => ({
                      value: obj.name,
                      label: obj.name,
                    }))
                  : []
              }
            />
          </Form.Item>

          <Form.Item label="Возрастной рейтинг">
            <Slider
              onChange={handleAgeRatingChange}
              marks={marks}
              defaultValue={[0, 18]}
              min={0}
              max={21}
              range={true}
            />
          </Form.Item>

          <Form.Item>
            <Button onClick={handleSearchWithFilters}>Найти</Button>
          </Form.Item>
        </Form>
      </Col>
    </>
  );
};
