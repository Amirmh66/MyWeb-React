import { useParams } from "react-router-dom"


function BlogEditor() {
  const { id } = useParams();

  return (
    <div>
      {id} <br/>
      This Page Used for edit blogs
    </div>
  )
}

export default BlogEditor
