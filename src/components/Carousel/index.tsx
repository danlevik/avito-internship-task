import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";

export const Carousel = ({ children, limit }) => {
  const [curItem, setCurItem] = useState(0);

  function handleNext() {
    curItem !== children.length - 1 - (limit - 1) &&
      setCurItem((value) => value + 1);
  }
  function handlePrev() {
    curItem !== 0 && setCurItem((value) => value - 1);
  }

  return (
    <>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            transform: `translateX(-${(100 / limit) * curItem}%)`,
            transition: "all 100ms",
          }}
        >
          {children}
        </div>

        <button
          style={{
            left: "0",

            width: "48px",
            height: "48px",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            background: "white",
            borderRadius: "50px",
            border: "2px solid black",
          }}
          onClick={handlePrev}
        >
          <ArrowLeftOutlined />
        </button>
        <button
          style={{
            right: "0",

            width: "48px",
            height: "48px",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            background: "white",
            borderRadius: "50px",
            border: "2px solid black",
          }}
          onClick={handleNext}
        >
          <ArrowRightOutlined />
        </button>
      </section>
    </>
  );
};
