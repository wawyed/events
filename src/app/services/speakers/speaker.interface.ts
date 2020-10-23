export interface ISpeaker {
  nat: string;
  gender: string;
  phone: string;
  dob: { date: string; age: number };
  name: { last: string; title: string; first: string };
  registered: { date: string; age: number };
  location: {
    country: string;
    city: string;
    street: { number: number; name: string };
    timezone: { offset: string; description: string };
    postcode: number;
    coordinates: { latitude: string; longitude: string };
    state: string
  };
  id: { name: string; value: string };
  login: { sha1: string; password: string; salt: string; sha256: string; uuid: string; username: string; md5: string };
  cell: string;
  email: string;
  picture: { thumbnail: string; large: string; medium: string };
}

