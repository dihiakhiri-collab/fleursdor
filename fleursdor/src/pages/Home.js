import React from "react";

export default function Home() {
  return (
    <div className="text-center mt-5">
      <h1 className="text-success fw-bold">Bienvenue sur Fleurs D’Or </h1>
      <p className="mt-3 fs-5">
        Découvrez nos magnifiques bouquets et fleurs fraîches pour toutes les occasions.
      </p>

      {/* 🌹 Carrousel Bootstrap avec 3 images */}
      <div
        id="carouselFleursDor"
        className="carousel slide carousel-fade mt-5 shadow-lg rounded"
        data-bs-ride="carousel"
      >
        {/* Indicateurs (petits points) */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselFleursDor"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselFleursDor"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselFleursDor"
            data-bs-slide-to="2"
          ></button>
        </div>

        {/* Contenu du carrousel */}
        <div className="carousel-inner rounded">
          <div className="carousel-item active">
            <img
              src="/images/principale.jpg"
              className="d-block w-100"
              alt="Image 1"
              style={{
                height: "500px",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/principale5.jpg"
              className="d-block w-100"
              alt="Image 2"
              style={{
                height: "500px",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/principale3.jpg"
              className="d-block w-100"
              alt="Image 3"
              style={{
                height: "500px",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </div>
        </div>

        {/* Flèches de navigation */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselFleursDor"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselFleursDor"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}
