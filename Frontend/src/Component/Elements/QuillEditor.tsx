import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
function QuillEditor({ field, form, ...props }: any) {

    const handlChange = (value: any) => {
        form.setFieldValue(field.name, value)
    }

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [
                { list: "ordered" },
                { list: "bullet" }
            ],
            ["link", "image"],
        ]
    }

    return (
        <ReactQuill value={field.value}
            onChange={handlChange}
            {...props}
            modules={modules}
        />
    )
}

export default QuillEditor
