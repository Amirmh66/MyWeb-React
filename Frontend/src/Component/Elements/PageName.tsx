
interface IPageName {
  pageName: string;
}

function PageName({ pageName }: IPageName) {
  return (
    <>
      <div className="flex items-center gap-1 ">
        <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">{pageName}</p>
        <div className="border-b flex-grow border-slate-300 dark:border-slate-700 opacity-60 rounded-full mt-1"></div>
      </div>
    </>
  )
}

export default PageName
