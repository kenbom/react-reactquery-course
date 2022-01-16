import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

export function InfinitePeopleCopySec() {
  // const url =
    // `https://api.unsplash.com/photos/random/?client_id=jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek&count=6&${pageParam}`;

  const fetchUrl = async ({pageParam = 1}) => {
    const response = await fetch(
      `https://api.unsplash.com/photos/random/?client_id=jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek&count=6&page=1`
    );
    const results = await response.json();
    return { results, nextPage:pageParam+1, totalPages: 100}
  };
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error, isFetching } = useInfiniteQuery(
    "unsplash-photo",
    fetchUrl,
    {
      getNextPageParam: (lastPage, pages) => lastPage.next || undefined,
    }
  );

  if(isLoading) return <div className="loading">Now loading...</div>
  if(isFetching) return <div className="loading">Now Fetching...</div>; 
  if (isError)
    return (
      <>
        <h3>Oops, something goes wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  // TODO: get data for InfiniteScroll via React Query
 return (
  //  <InfiniteScroll next={fetchNextPage} hasMore={hasNextPage}>
  <div>
    {<img src="data[0].pages.urls.regular" width="100%" />}
     {/* {data.map((item) => {
       return <img key={item.id} src={item.urls.regular} alt="splash" width="100%" />;
     })} */}
     </div>
  //  </InfiniteScroll>
 );}
