import React from "react";

const ProductList = ({ filteredData }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center mt-5">
      {filteredData.length > 0 ? (
        filteredData.map((product) => (
          <div
            key={product.id}
            className="card col-12 col-sm-6 col-md-3 col-lg-3 m-3"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              backgroundColor: "#fff",
              border: "none",
              transition: "transform 0.3s ease-in-out",
              height: "300px",
              maxWidth: "280px",
            }}
          >
            <div
              className="card-header"
              style={{
                backgroundColor: "#003366",
                color: "#fff",
                padding: "12px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="font-weight-bold" style={{ fontSize: "1rem" }}>
                  {product.product_name}
                </h5>
                <h5 className="font-weight-bold" style={{ fontSize: "1rem" }}>
                  ₱{product.price}
                </h5>
              </div>
            </div>

            <div
              className="card-body"
              style={{ padding: "10px", position: "relative" }}
            >
              <div
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#D3D3D3", // GRAY
                  color: "#003366", // BLUE
                  borderRadius: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "12px",
                }}
              >
                {product.category}
              </div>

              <p
                className="card-text"
                style={{ fontSize: "0.85rem", color: "#555" }}
              >
                {product.description}
              </p>

              <div
                className="position-absolute"
                style={{ bottom: "10px", right: "10px", fontSize: "0.75rem" }}
              >
                <small className="text-muted">Stock: {product.quantity}</small>
              </div>
            </div>

            <div
              className="card-footer"
              style={{
                backgroundColor: "#003366",
                color: "#fff",
                padding: "8px 12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="d-flex align-items-center">
                <i
                  className="bi bi-truck"
                  style={{ fontSize: "0.75rem", marginRight: "5px" }}
                ></i>
                <small style={{ fontSize: "0.75rem" }}>2-3 days Delivery</small>
              </div>

              <button
                className="btn btn-outline-light btn-sm"
                style={{
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  padding: "6px 12px",
                  fontWeight: "bold",
                }}
                onClick={() =>
                  alert(`"${product.product_name}" has been added to the cart!`)
                }
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No products found with the selected filters.</div>
      )}
    </div>
  );
};

export default ProductList;
