export const cardStyles = (gradient) => ({
    background: gradient,
    color: "#fff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  });
  
  export const cardContentStyles = {
    textAlign: "center",
  };
  
  export const titleStyles = {
    letterSpacing: "1px",
    marginBottom: "5px",
  };
  
  export const countStyles = {
    fontWeight: 600,
    fontSize: "2rem",
    marginBottom: "-5px",
  };
  