import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"

function QuillEditor({ field, form, ...props }: any) {

    const handlChange = (value: any) => {
        form.setFieldValue(field.name, value)
    }

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [
                { list: "ordered" },
                { list: "bullet" }
            ],
            ["link"],
        ]
    }

    return (
        <ReactQuill value={field.value}
            onChange={handlChange}
            {...props}
            modules={modules}
            className='dark:placeholder:text-gray-100'
        />
    )
}

export default QuillEditor
