export interface ISpeaker {
  name: {
    first: string;
    last: string;
  };
  email: string;
  login: {
    uuid: string;
  };
  phone: string;
  picture: {
    thumbnail: string;
    large: string;
    medium: string;
  };
}
