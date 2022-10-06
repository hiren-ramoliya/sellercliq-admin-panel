import ModalSearch from "../modalSearch";
import "./filterSearch.scss";
export default function SearchBar(props: any) {
  const { search, setSearch } = props;
  return (
    <>
      <div className="brand-search-section-design">
        <ModalSearch search={search} setSearch={setSearch} />
      </div>
    </>
  );
}
