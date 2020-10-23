export interface ISpeaker {
  name: {
    first: string;
    last: string;
  };
  email: string;
  id: {
    value: string;
  };
  phone: string;
  picture: {
    thumbnail: string;
    large: string;
    medium: string;
  };
}
