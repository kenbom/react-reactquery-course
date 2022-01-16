import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl =
  "https://api.unsplash.com/photos/random/?client_id=jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek&count=6";

const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeopleCopy() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  const hasNextPageFn= ()=>true

  if(isLoading) return <div className="loading">Now loading...</div>
  if (isError)
    return (
      <>
        <h3>Oops, something goes wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  // TODO: get data for InfiniteScroll via React Query
 return (
   <InfiniteScroll next={fetchNextPage} hasMore={hasNextPage} >
     {data.pages.map((page) => {
       return page.map((item) => {return <img key={item.id} src={item.urls.regular} width="100%"/>})
      // return <img key={page.id} src={page.urls.regular} width="100%"/>
     }
 )
}</InfiniteScroll>)}
