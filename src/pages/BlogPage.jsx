import Greeting from "../components/Greeting";
import CreateBlog from "../components/CreateBlog";
import '../style/blog.css'

export default function BlogPage() {
  return (
    <div>
      <Greeting />
      <div className="blogContainer">
        <div className="createBlogContainer">
          <CreateBlog />
        </div>
        <div></div>
      </div>
    </div>
  );
}
