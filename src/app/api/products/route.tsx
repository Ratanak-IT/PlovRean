export async function GET() {
  const getProducts=[
     {
    "id": 1,
    "title": "C++",
    "description": "High-performance laptop for students and developers.",
    "price": 680,
    "image": "/images/cpp.png"
  },
  {
    "id": 2,
    "title": "Python",
    "description": "Noise-cancelling wireless headphones.",
    "price": 120,
    "image": "/images/python.png"
  },
  {
    "id": 3,
    "title": "React",
    "description": "Fitness tracking and notifications.",
    "price": 95,
    "image": "/images/react.png"
  },
  {
    "id": 4,
    "title": "HTML",
    "description": "use for frontend to make the structure of webpage",
    "price": 95,
    "image": "/images/html.png"
  }
  ];
  return Response.json(getProducts);
}