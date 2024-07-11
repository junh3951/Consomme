import "../styles/sojae_maker.css";
import React, { useState } from "react";
import RectButton from "../components/Button/rect_button";

function App() {
  //유저 이름
  const username = "너구리";

  //키워드입력
  const [inputValue, setInputValue] = useState("");

  //콘텐츠 소재 버튼
  const handleClick1 = () => {
    alert("Free Trial 시작합니다!");
  };
  //소재 보관함 버튼
  const handleClick2 = () => {
    alert("Free Trial 시작합니다!");
  };
  //로그아웃 버튼
  const handleClick3 = () => {
    alert("Free Trial 시작합니다!");
  };
  //생성 버튼
  const handleClick4 = () => {
    alert("Free Trial 시작합니다!");
  };

  const youtubers = {
    sports: [
      { name: "유튜버1", image: "url1" },
      { name: "유튜버2", image: "url2" },
      { name: "유튜버3", image: "url2" },
      { name: "유튜버4", image: "url2" },
      { name: "유튜버5", image: "url2" },
    ],
    music: [
      { name: "유튜버6", image: "url3" },
      { name: "유튜버7", image: "url3" },
      { name: "유튜버8", image: "url3" },
      { name: "유튜버9", image: "url3" },
      { name: "유튜버10", image: "url3" },
    ],
    // Add other categories here...
  };

  const [category, setCategory] = useState("sports"); // Set initial valid category
  const [selectedYoutuber, setSelectedYoutuber] = useState(null);
  const [displayedYoutubers, setDisplayedYoutubers] = useState(
    youtubers["sports"]
  ); // Set initial displayed youtubers

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setDisplayedYoutubers(youtubers[newCategory]);
    setSelectedYoutuber(null); // 새 카테고리 선택 시 선택된 유튜버 초기화
  };

  const handleYoutuberSelect = (youtuber) => {
    setSelectedYoutuber(youtuber);
  };

  return (
    <div className="frame">
      <div className="div">
        <div className="overlap">
          <div className="text-wrapper">Create</div>
          <div className="archive_icon"></div>
          <div className="logout_icon"></div>
          <button className="archive" onClick={handleClick2}>
            소재 보관함
          </button>
          <button className="logout" onClick={handleClick3}>
            로그아웃
          </button>
          <div className="group">
            <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <div className="rectangle" />
                <div className="main_icon"></div>
              </div>
            </div>
            <div className="text-wrapper-4">Consome</div>
          </div>
          <button className="Contents" onClick={handleClick1}>
            콘텐츠 소재
          </button>
          <div className="Archive"></div>
          <div className="video"></div>
          <div className="sign-out-left"></div>
          <div className="overlap-wrapper">
            <div className="overlap-2">
              <div className="text-wrapper-6">{username} 님</div>
              <div className="div-wrapper">
                <div className="text-wrapper-7">Free Trial</div>
              </div>
            </div>
          </div>
          <div className="group-2">
            <div className="overlap-3">
              <div className="text-wrapper-8">
                도움이 되셨다면
                <br />
                간단한 사용후기를
                <br />
                남겨주시겠어요?
              </div>
              <div className="Edit"></div>
            </div>
          </div>
        </div>
        <div className="text-wrapper-9">콘텐츠 영상 소재 생성하기</div>
        <div className="overlap-4">
          <RectButton disabled={!selectedYoutuber} onClick={handleClick4}>
            생성하기
          </RectButton>
        </div>
        <div className="text-wrapper-11">관심 있는 키워드</div>
        <div className="group-3">
          <div className="overlap-5">
            <input
              className="text-input"
              type="text"
              value={inputValue}
              placeholder="예시. 탕후루"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            className={`SportsCategory ${
              category === "sports" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("sports")}
          >
            스포츠
          </button>
          <button
            className={`KnowhowCategory ${
              category === "knowhow" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("knowhow")}
          >
            노하우 / 스타일
          </button>
          <button
            className={`MusicCategory ${category === "music" ? "active" : ""}`}
            onClick={() => handleCategoryChange("music")}
          >
            음악
          </button>
          <button
            className={`NewsCategory ${category === "news" ? "active" : ""}`}
            onClick={() => handleCategoryChange("news")}
          >
            뉴스 / 정치
          </button>
          <button
            className={`NGOCategory ${category === "ngo" ? "active" : ""}`}
            onClick={() => handleCategoryChange("ngo")}
          >
            비영리 / 사회운동
          </button>
          <button
            className={`BlogCategory ${category === "blog" ? "active" : ""}`}
            onClick={() => handleCategoryChange("blog")}
          >
            인물 / 블로그
          </button>
          <button
            className={`AnimalCategory ${
              category === "animal" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("animal")}
          >
            애완동물 / 동물
          </button>
          <button
            className={`TechCategory ${category === "tech" ? "active" : ""}`}
            onClick={() => handleCategoryChange("tech")}
          >
            과학기술
          </button>
          <button
            className={`GuitarCategory ${
              category === "guitar" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("guitar")}
          >
            기타
          </button>
          <button
            className={`FamilyCategory ${
              category === "family" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("family")}
          >
            가족
          </button>
          <button
            className={`BeautyCategory ${
              category === "beauty" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("beauty")}
          >
            뷰티 / 패션
          </button>
          <button
            className={`EduCategory ${category === "edu" ? "active" : ""}`}
            onClick={() => handleCategoryChange("edu")}
          >
            교육
          </button>
          <button
            className={`EntertainmentCategory ${
              category === "entertainment" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("entertainment")}
          >
            엔터테인먼트
          </button>
          <button
            className={`MovieCategory ${category === "movie" ? "active" : ""}`}
            onClick={() => handleCategoryChange("movie")}
          >
            영화 / 애니메이션
          </button>
          <button
            className={`FoodCategory ${category === "food" ? "active" : ""}`}
            onClick={() => handleCategoryChange("food")}
          >
            음식
          </button>
          <button
            className={`GameCategory ${category === "game" ? "active" : ""}`}
            onClick={() => handleCategoryChange("game")}
          >
            게임
          </button>
          <button
            className={`TravelCategory ${
              category === "travel" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("travel")}
          >
            여행 / 이벤트
          </button>
        </div>
        <div className="youtuber-container">
          {displayedYoutubers &&
            displayedYoutubers.map((youtuber) => (
              <button
                key={youtuber.name}
                onClick={() => handleYoutuberSelect(youtuber)}
                className={`youtuber ${
                  selectedYoutuber === youtuber ? "selected" : ""
                }`}
              >
                <img src={youtuber.image} alt={youtuber.name} />
                <p>{youtuber.name}</p>
              </button>
            ))}
        </div>
        <div className="text-wrapper-13">콘텐츠 카테고리</div>
      </div>
    </div>
  );
}
export default App;
