import { Card, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { FilmCardType } from "../../features/types";

export const MovieCard = ({ obj }: { obj: FilmCardType }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/movie/${obj.id}`, { replace: true})
  }

  return (
    <Card
      onClick={handleNavigation}
      style={{ margin: "8px" }}
      size="small"
      hoverable={true}
      cover={
        <div style={{ overflow: "hidden" }}>
          <Image
            style={{ height: "100%" }}
            preview={false}
            alt={`Постер фильма ${obj.name ? obj.name : obj.alternativeName}`}
            src={obj.poster.url}
            fallback="https://yastatic.net/s3/kinopoisk-frontend/common-static/img/projector-logo/placeholder.svg"
          />
        </div>
      }
      bordered={true}
    >
      {obj.name ? obj.name : obj.alternativeName}
    </Card>
  );
};
