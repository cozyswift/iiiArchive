export type Keyword = {
  id: string;
  keyword: string;
};

export type ImageArr = {
  id: string;
  regUser: string;
  fileName: string;
  examUrl: string[];
  width: string;
  height: string;
  tag: string[];
  regIp: string;
  fileType: string;
  materialId: string;
};

export type MaterialTypes = {
  id: string;
  typeName: string;
};

export type Material = {
  id: string;
  archivistId: string;
  title: string;
  description: string;
  picture: any[];
  createdAt: Date;
  creator: string;
  materialType: string;
  donor: string[];
  keyword: string[];
  identificationNum: string[];
};

export type Archivist={
  id:string;
  name:string;
  archivistId:string;
  eMail:string;
}


export const archivists:Archivist[]=[];
export const imgList: ImageArr[] = [];
export const materialList: Material[] = [];

export const resetDB = () => {
  archivists.splice(
    0,
    Infinity,
    ...[
      {
        id: '1',
        name: '주강민',
        archivistId:'cozyswift',
        eMail:'cozyswift@gmail.com'
      },
      {
        id: '2',
        name: '주강수',
        archivistId:'sleepist',
        eMail:'sleepist@gmail.com'
      },
      {
        id: '3',
        name: '조수정',
        archivistId:'jsj4525',
        eMail:'jsj4515@gmail.com'
      },
    ]
  );

  imgList.splice(
    0,
    Infinity,
    ...[
      {
        id: "1",
        regUser: "주강민",
        fileName: "현수막(4)",
        examUrl: [
          "http://iiiarchives.org/wp-content/uploads/2018/11/ad003-A-00008-min-1024x205.jpg"
        ],
        width: "1024",
        height: "205",
        tag: ["서면", "박근혜"],
        regIp: "",
        fileType: "jpg",
        materialId: "1"
      },
      {
        id: "2",
        regUser: "조수정",
        fileName: "170310촛불승리시국집회",
        examUrl: [
          "http://iiiarchives.org/wp-content/uploads/collection/picture/003/170310 촛불승리 시국집회/pi003-B-00103-1024x683.jpg"
        ],
        width: "1024",
        height: "683",
        tag: ["서면", "시국집회", "탄핵인용", "촛불승리", "거리행진"],
        regIp: "",
        fileType: "jpg",
        materialId: "2"
      },
      {
        id: "3",
        regUser: "주강수",
        fileName: "170310촛불승리시국집회",
        examUrl: [
          "http://iiiarchives.org/wp-content/uploads/collection/picture/003/170125 비주류사진관 천주교단체 시국대회/pi003-B-00081-1024x683.jpg"
        ],
        width: "1024",
        height: "683",
        tag: ["서면", "시국집회", "천주교단체", "거리행진"],
        regIp: "",
        fileType: "jpg",
        materialId: "1"
      }
    ]
  );

  materialList.splice(
    0,
    Infinity,
    ...[
      {
        id: "1",
        archivistId: "주강수",
        title: "현수막(4)",
        description: "박근혜는 하야하라",
        picture: [imgList.find(img => img.materialId[0] === "1")],
        createdAt: new Date(Date.now() - 60 * 1000 * 1000),
        creator: "박근혜퇴진 부산운동본부",
        materialType: "jpg",
        donor: ["박근혜퇴진 부산운동본부"],
        keyword: ["서면", "박근혜퇴진본부", "하야", "퇴진"],
        identificationNum: ["ad003-A00008"]
      },
      {
        id: "2",
        archivistId: "주강민",
        title: "170310 촛불승리 시국집회",
        description: "박근혜 파면이 결정된 3월 10일의 131차 시국집회의 모습이다.",
        picture: [imgList.find(img => img.materialId[1] === "2")],
        createdAt: new Date(Date.now() - 60 * 1000 * 1000),
        creator: "",
        materialType: "jpg",
        donor: ["박근혜퇴진 부산운동본부", "부산퇴진운동본부", "비주류사진관"],
        keyword: ["서면", "시국집회", "탄핵인용", "촛불승리", "거리행진"],
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
    ]
  );
};

resetDB();





