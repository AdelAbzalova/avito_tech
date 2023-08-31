import Filter from "./Filter";

export default function Sort(props) {
  const options = [
    {
      value: "release-date",
      label: "Дате релиза",
    },
    {
      value: "popularity",
      label: "Популярности",
    },
    {
      value: "alphabetical",
      label: "Алфавиту",
    },
    {
      value: "relevance",
      label: "Актуальности",
    },
  ];
  return (
    <Filter
      placeholder="сортировку"
      options={options}
      setFilter={props.setSort}
      value={props.sort}
    />
  );
}
