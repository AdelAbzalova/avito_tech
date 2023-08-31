import Filter from "./Filter";

export default function PlatformFilter(props) {
  const options = [
    {
      value: "pc",
      label: "Windows (PC)",
    },
    {
      value: "browser",
      label: "Browser (Web)",
    },
  ];
  return (
    <Filter
      placeholder="платформу"
      options={options}
      setFilter={props.setPlatform}
      value={props.platform}
    />
  );
}
