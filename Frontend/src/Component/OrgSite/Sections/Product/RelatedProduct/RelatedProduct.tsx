import Card from "../CardProduct/Card";

function RelatedProduct() {
  return (
    <>
      <div className="mt-10 border border-gray-500 rounded-lg">
        <p className="pl-8 pt-10 text-lg font-semibold">RelatedProducts</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 p-10">
          <Card
            _id={""}
            imageUrl={""}
            name={""}
            summary={""}
            description={""}
            price={0}
          />
        </div>
      </div>
    </>
  );
}
export default RelatedProduct;
