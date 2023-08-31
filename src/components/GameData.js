import { Card, Col, Image, Row, Carousel, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function GameData(props) {
  const game = props.game;
  const carouselImgs =
    game.screenshots &&
    game.screenshots.map((screenshot) => (
      <Image preview={false} src={screenshot.image} key={screenshot.id} />
    ));
  const screenshotImgs =
    game.screenshots &&
    game.screenshots.map((screenshot) => (
      <Col span={8} key={screenshot.id}>
        <Image src={screenshot.image} />
      </Col>
    ));

  return (
    <Row gutter={[20, 16]} justify="center" style={{ marginTop: "15px" }}>
      <Col xs={20} sm={20} md={8} lg={8}>
        <div className="gameData-ava">
          <Row gutter={[0, 48]} justify="center">
            <Col>
              <Image src={game.thumbnail} style={{ width: "100%" }} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button style={{ width: "100%", marginTop: "20px" }}>
                  Назад к списку игр
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </Col>

      <Col xs={20} sm={20} md={12} lg={12}>
        <h1>{game.title}</h1>
        <Card>
          <Row gutter={[16, 16]} justify="space-between">
            <Col span={12}>
              Дата релиза:{" "}
              {game.release_date &&
                game.release_date.split("-").reverse().join(".")}
            </Col>
            <Col span={12}>Издатель: {game.publisher}</Col>
            <Col span={12}>Разработчик: {game.developer}</Col>
            <Col span={12}>Жанр: {game.genre}</Col>
          </Row>
        </Card>

        <h3 style={{ margin: "15px 0" }}>Скриншоты: </h3>
        <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
          <Image.PreviewGroup>{screenshotImgs}</Image.PreviewGroup>
        </Row>
        <Carousel autoplay>{carouselImgs}</Carousel>

        {game.minimum_system_requirements && (
          <Row>
            <h3 style={{ margin: "15px 0" }}>Системные требования: </h3>
            <Col>
              <Card>
                <Row gutter={[16, 16]} justify="space-between">
                  <Col span={24}>
                    Операционная система: {game.minimum_system_requirements.os}
                  </Col>
                  <Col span={24}>
                    Процессор: {game.minimum_system_requirements.processor}
                  </Col>
                  <Col span={24}>
                    Оперативная память:{" "}
                    {game.minimum_system_requirements.memory}
                  </Col>
                  <Col span={24}>
                    Видеокарта: {game.minimum_system_requirements.graphics}
                  </Col>
                  <Col span={24}>
                    Место на диске: {game.minimum_system_requirements.storage}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}
