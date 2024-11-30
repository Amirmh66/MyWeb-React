import Button from "../Elements/Buttons"

function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
        <>
            <div className='bg-gray-50 border rounded-lg flex flex-col items-center justify-center text-left my-10 mx-24 p-5'>
                <p>Something went wrong:</p>
                <span className="text-lg font-semibold py-10 text-red-600">{error.message}</span>
                <Button onClick={resetErrorBoundary} text={"Try Again"} className="bg-gray-400" />
            </div>
        </>
    )
}

export default ErrorFallback
