export interface AddressResponse {
  adresser: Address[];
}

export interface Address {
  adressetekst: string;
  poststed: string;
  postnummer: string;
  representasjonspunkt: Coordinates;
  displayText?: string; // Added for AutoComplete display
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export class GeoNorge {
  private static readonly BASE_URL = "https://ws.geonorge.no/adresser/v1/sok?";

  static async search(searchString: string): Promise<AddressResponse> {
    const response = await fetch(
      this.BASE_URL +
        new URLSearchParams({
          fuzzy: "true",
          sok: searchString,
        }).toString(),
    );

    const data = (await response.json()) as AddressResponse;
    return data;
  }
}
