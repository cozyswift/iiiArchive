export const keywords = [
  {
    id: "1",
    keyword: "서면"
  },

  {
    id: "2",
    keyword: "박근혜퇴진본부"
  },
  {
    id: "3",
    keyword: "하야"
  },
  {
    id: "3",
    keyword: "퇴진"
  },
  {
    id: "4",
    keyword: "시국집회"
  },
  {
    id: "5",
    keyword: "탄핵인용"
  },
  {
    id: "6",
    keyword: "촛불승리"
  },
  {
    id: "7",
    keyword: "거리행진"
  },
  {
    id: "8",
    keyword: "천주교단체"
  },
  {
    id: "9",
    keyword: "거리행진"
  }
];

export const materialTypes = [
  {
    id: "1",
    typeName: "jpg"
  }
];

let result:string[]=[];
result=findKeyword();
export const material = [
  {
    id: "1",
    title: "현수막(4)",
    description: "박근혜는 하야하라",
    picture:
      "http://iiiarchives.org/wp-content/uploads/2018/11/ad003-A-00008-min-1024x205.jpg",
    createdAt: new Date(Date.now() - 60 * 1000 * 1000),
    creator: "박근혜퇴진 부산운동본부",
    // materialType: materialTypes.find(type => type.typeName === "jpg"),
    donor: ["박근혜퇴진 부산운동본부"],
    keyword: {
      inputTag: ["서면", "박근혜퇴진본부", "하야", "퇴진"],
      // finalTag: result
    },
    identificationNum: "ad003-A00008"
  },
  {
    id: "2",
    title: "170310 촛불승리 시국집회",
    description: "박근혜 파면이 결정된 3월 10일의 131차 시국집회의 모습이다.",
    picture:
      "http://iiiarchives.org/wp-content/uploads/collection/picture/003/170310 촛불승리 시국집회/pi003-B-00103-1024x683.jpg",
    createdAt: new Date(Date.now() - 60 * 1000 * 1000),
    creator: "",
    // materialType: materialTypes.find(type => type.typeName === "jpg"),
    donor: ["박근혜퇴진 부산운동본부", "부산퇴진운동본부", " 비주류사진관"],
    keyword: {
      inputTag: ["서면", "시국집회", "탄핵인용", "촛불승리", "거리행진"],
      // finalTag: result
    },
    identificationNum: [
      "pi003-A-00275",
      "pi003-A-00276",
      "pi003-A-00277",
      "pi003-A-00278",
      "pi003-A-00279",
      "pi003-B-00099",
      "pi003-B-00100",
      "pi003-B-00101",
      "pi003-B-00102",
      "pi003-B-00103",
      "pi003-B-00104",
      "pi003-B-00105"
    ]
  },
  {
    id: "3",
    title: "170125 천주교단체 시국집회",
    description: "1월 25일 부산시국집회의 모습이다.",
    picture:
      "http://iiiarchives.org/wp-content/uploads/collection/picture/003/170125 비주류사진관 천주교단체 시국대회/pi003-B-00081-1024x683.jpg",
    createdAt: new Date(Date.now() - 60 * 1000 * 1000),
    creator: "",
    // materialType: materialTypes.find(type => type.typeName === "jpg"),
    donor: ["비주류사진관"],
    keyword: {
      inputTag: ["서면", "시국집회", "천주교단체", "거리행진"],
      // finalTag: ["서면", "시국집회", "천주교단체", "거리행진"]
    },
    identificationNum: [
      "pi003-A-00275",
      "pi003-A-00276",
      "pi003-A-00277",
      "pi003-A-00278",
      " pi003-A-00279",
      "pi003-B-00099",
      "pi003-B-00100",
      "pi003-B-00101",
      "pi003-B-00102",
      "pi003-B-00103",
      "pi003-B-00104",
      "pi003-B-00105"
    ]
  }
];

export const materials = [
  {
    id: "1",
    archivist: "주강민",
    material: material.find(m => m.id === "1")
  },
  {
    id: "2",
    archivist: "조수정",
    material: material.find(m => m.id === "2")
  },

  {
    id: "3",
    archivist: "주강수",
    material: material.find(m => m.id === "3")
  }
];




export function findKeyword() {
  let keywordArr: string[] = [];
  let tag = "";

  for (var i in keywords) {
    tag = keywords[i].keyword;

    keywordArr = keywordArr.concat(tag);
  }

  let findKeyArr: string[] = [];

  for (var i in material) {
    let findkey: any;
    let a: any;
    findkey = material[i].keyword.inputTag;

    for (var i in findkey) {
      a = keywordArr.find(a => a === `${findkey[i]}`);
      findKeyArr = findKeyArr.concat(a);
    }
  }
  return findKeyArr;
}
