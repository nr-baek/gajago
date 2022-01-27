import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons/lib/icons';
import React from 'react';
import { StyledReview } from './styles';

function ReviewOfTrip() {
  return (
    <StyledReview selected={false}>
      <SmileTwoTone className="expression" twoToneColor="#5e71b1" />
      <div className="title">
        <span className="reviewTitle">몸은 힘들지만 즐거움은 2배! 역시 제주~</span>
        <p className="regionAndTripTitle">
          <span> (경상북도) 나라와 함께 단양여행</span>
        </p>
      </div>
      <div className="term">2021-12-12 ~ 2021-01-12</div>
      <div className="likes">
        <HeartTwoTone twoToneColor="#eb2f2f" /> 0
      </div>
      <div className="content">
        <img alt="이미지" />
        <p>
          로렘 입숨은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을
          보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에 시각 디자인
          프로젝트 모형의 채움 글로도 이용된다.
        </p>
      </div>
    </StyledReview>
  );
}

export default ReviewOfTrip;
