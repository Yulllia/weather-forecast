import "./Search.css";
import SearchIcon from "../../assets/search-icon.svg";
import { useRecoilState } from "recoil";
import { searchState } from "../../state/AtomSearch";

function Search(props: { handleSearch: any }) {
  const { handleSearch } = props;
  const [searchTerm, setSearchTerm] = useRecoilState<string>(searchState);

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={(e)=>e.preventDefault()}>
        <input
          type="text"
          name="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search your trip"
          onKeyDown={handleKeyPress}
          className="search-input"
        />
        <div className="search-button" onClick={handleSearch}>
        <img src={SearchIcon} alt="Description" width={20} height={20}/>
        </div>
      </form>
    </div>
  );
}

export default Search;
