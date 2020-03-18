import React from "react";
import ReactDOM from "react-dom";
import { cleanup, render, waitForDomChange } from "@testing-library/react";
import InfroCard from "./InfoCard";
import { History } from "history";

describe("인포카드 테스트", () => {
  afterEach(cleanup);

  it("렌더 작업이 사료데이터를 가지고 오는지 테스트", async () => {
    //가짜 응답만들기
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          materials: [
            {
              id: "1",
              archivist: "주강민",
              material: {
                id: '1',
                title: '현수막(4)',
                description: '박근혜는 하야하라',
                picture:
                  'http://iiiarchives.org/wp-content/uploads/2018/11/ad003-A-00008-min-1024x205.jpg',
                createdAt: new Date(Date.now() - 60 * 1000 * 1000),
                creator: '박근혜퇴진 부산운동본부',
                materialType: 'jpg',
                donor: ['박근혜퇴진 부산운동본부'],
                keyword: ['서면', '박근혜퇴진본부', '하야', '퇴진'],
                identificationNum: ['ad003-A00008'],
              },
            }
          ]
        }
      })
    );

    {
        const {container,getByTestId}=render(<InfroCard history={history}/>);
        await waitForDomChange({container});

        expect(getByTestId('archvist')).toHaveTextContent("주강민");
        expect(getByTestId('picture')).toHaveAttribute('src','http://iiiarchives.org/wp-content/uploads/2018/11/ad003-A-00008-min-1024x205.jpg');
        // expect(getByTestId('date')).toHaveTextContent('02:00');
    }
  });
});
