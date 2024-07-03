import Greeting from "../components/Greeting";
import Blog from "../components/Blog";
import LinkElement from "../components/singleComponents/linkElement.jsx";
import "../style/blog.css";

export default function BlogPage() {
  return (
    <div>
      <Greeting />
      <LinkElement />
      <Blog />
    </div>
  );
}
