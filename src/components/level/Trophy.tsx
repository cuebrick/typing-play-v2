import styled from 'styled-components';

type IProps = {
  /**
   * 0 ~ 3, -99(기록이 없는 경우),
   */
  trophy: number;
};

const Container = styled.svg<{$trophy: number}>`
  // no record effect
  ${(props) => (props.$trophy === -99 ? 'filter: grayscale(100%); opacity: 0.3;' : '')}
`;

function Trophy({trophy}: IProps): JSX.Element {
  return (
    <Container
      $trophy={trophy}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 97.5C76.2335 97.5 97.5 76.2335 97.5 50C97.5 23.7665 76.2335 2.5 50 2.5C23.7665 2.5 2.5 23.7665 2.5 50C2.5 76.2335 23.7665 97.5 50 97.5Z"
        fill="#152867"
        stroke="#ABE1FF"
        strokeWidth="5"
      />
      <g clipPath="url(#clip0_1037_7)">
        <path
          d="M32.8602 55.2406H27.418C21.6648 55.2406 17 50.5119 17 44.6799C17 38.8478 21.6648 34.1191 27.418 34.1191H32.8602C33.6031 34.1191 34.2078 34.7321 34.2078 35.4852C34.2078 36.2383 33.6031 36.8513 32.8602 36.8513H27.418C23.1679 36.8513 19.7125 40.354 19.7125 44.6624C19.7125 48.9707 23.1679 52.4734 27.418 52.4734H32.8602C33.6031 52.4734 34.2078 53.0864 34.2078 53.8395C34.2078 54.5926 33.6204 55.2406 32.8602 55.2406Z"
          fill="#CCA400"
        />
        <path
          d="M73.5993 55.2406H68.1398C67.3969 55.2406 66.7922 54.6276 66.7922 53.8745C66.7922 53.1214 67.3969 52.5085 68.1398 52.5085H73.582C77.8321 52.5085 81.2875 49.0057 81.2875 44.6974C81.2875 40.389 77.8321 36.8863 73.582 36.8863H68.1398C67.3969 36.8863 66.7922 36.2733 66.7922 35.5202C66.7922 34.7672 67.3969 34.1542 68.1398 34.1542H73.582C79.318 34.1542 84 38.8829 84 44.7149C84 50.5469 79.3352 55.2406 73.5993 55.2406Z"
          fill="#CCA400"
        />
        <path
          d="M54.2664 81.9348V68.1516H46.7509V81.9348C46.7509 84.2817 44.885 86.1731 42.5699 86.1731V90.1487H58.5856V86.1731H58.4474C56.1323 86.1731 54.2664 84.2817 54.2664 81.9348Z"
          fill="#EEBF00"
        />
        <path d="M54.1973 65.1708H46.7509V73.735H54.1973V65.1708Z" fill="#CCA400" />
        <path
          d="M68.1398 32V51.8079C68.1398 61.6331 60.2096 69.6894 50.5 69.6894C40.8076 69.6894 32.8602 61.6506 32.8602 51.8079V32H68.1398Z"
          fill="#EEBF00"
        />
        <path d="M65 89H36V95H65V89Z" fill="#A05F33" />
        <path d="M65 91H36V98H65V91Z" fill="#BF7E52" />
      </g>
      <path
        d="M34.6134 64.578L31.9608 66.046L30.5106 68.731C30.2931 69.1347 29.6405 69.1347 29.423 68.731L27.9728 66.046L25.3202 64.578C25.1208 64.468 25 64.26 25 64.0276C25 63.7952 25.1208 63.5872 25.3202 63.4771L27.9728 62.0092L29.423 59.3242C29.5318 59.1223 29.7433 59 29.9668 59C30.1964 59 30.4019 59.1223 30.5106 59.3242L31.9608 62.0092L34.6134 63.4771C34.8128 63.5872 34.9337 63.8013 34.9337 64.0276C34.9337 64.26 34.8128 64.468 34.6134 64.578Z"
        fill="white"
      />
      <path
        d="M67.6798 79.3812L65.0272 80.8491L63.577 83.5342C63.3595 83.9378 62.7069 83.9378 62.4894 83.5342L61.0392 80.8491L58.3866 79.3812C58.1872 79.2711 58.0663 79.0632 58.0663 78.8307C58.0663 78.5983 58.1872 78.3904 58.3866 78.2803L61.0392 76.8124L62.4894 74.1273C62.5981 73.9255 62.8096 73.8031 63.0332 73.8031C63.2628 73.8031 63.4682 73.9255 63.577 74.1273L65.0272 76.8124L67.6798 78.2803C67.8792 78.3904 68 78.6044 68 78.8307C68 79.0632 67.8792 79.2711 67.6798 79.3812Z"
        fill="white"
      />
      {/* star */}
      {trophy > 1 && (
        <path
          d="M24.9722 15.576L27.2273 19.8963C27.3944 20.2105 27.6867 20.4069 28.0208 20.4462L33.0741 21.1531C33.9511 21.2709 34.327 22.2921 33.6588 22.8812L30.0254 26.2196C29.7749 26.4553 29.6496 26.7695 29.7331 27.1229L30.6101 31.836C30.7772 32.6607 29.8166 33.2892 29.0649 32.8964L24.5545 30.6577C24.2204 30.5006 23.8446 30.5006 23.5522 30.6577L19.0001 32.8964C18.2066 33.2892 17.2878 32.6607 17.4549 31.836L18.3319 27.1229C18.3737 26.8087 18.2901 26.4553 18.0396 26.2196L14.3227 22.8812C13.6963 22.2921 14.0304 21.2709 14.9074 21.1531L19.9606 20.4462C20.2948 20.4069 20.6289 20.2105 20.7541 19.8963L23.0093 15.576C23.4269 14.8298 24.5545 14.8298 24.9722 15.576Z"
          fill="#ED8A19"
        />
      )}
      {(trophy === 1 || trophy === 3) && (
        <path
          d="M51.2638 1.74623L54.1955 7.50659C54.4127 7.92552 54.7928 8.18736 55.2271 8.23972L61.7963 9.18233C62.9365 9.33943 63.4251 10.701 62.5564 11.4865L57.8331 15.9377C57.5073 16.2519 57.3445 16.6708 57.453 17.1421L58.5932 23.4261C58.8103 24.5258 57.5616 25.3637 56.5844 24.84L50.7209 21.8551C50.2866 21.6457 49.7979 21.6457 49.4179 21.8551L43.5001 24.84C42.4686 25.3637 41.2742 24.5258 41.4914 23.4261L42.6315 17.1421C42.6858 16.7232 42.5772 16.2519 42.2514 15.9377L37.4195 11.4865C36.6051 10.701 37.0395 9.33943 38.1796 9.18233L44.7488 8.23972C45.1832 8.18736 45.6175 7.92552 45.7804 7.50659L48.7121 1.74623C49.255 0.751257 50.7209 0.751257 51.2638 1.74623Z"
          fill="#ED8A19"
        />
      )}
      {trophy > 1 && (
        <path
          d="M76.9722 15.576L79.2273 19.8963C79.3944 20.2105 79.6867 20.4069 80.0208 20.4462L85.0741 21.1531C85.9511 21.2709 86.327 22.2921 85.6588 22.8812L82.0254 26.2196C81.7749 26.4553 81.6496 26.7695 81.7331 27.1229L82.6101 31.836C82.7772 32.6607 81.8166 33.2892 81.0649 32.8964L76.5545 30.6577C76.2204 30.5006 75.8446 30.5006 75.5522 30.6577L71.0001 32.8964C70.2066 33.2892 69.2878 32.6607 69.4549 31.836L70.3319 27.1229C70.3737 26.8087 70.2901 26.4553 70.0396 26.2196L66.3227 22.8812C65.6963 22.2921 66.0304 21.2709 66.9074 21.1531L71.9606 20.4462C72.2948 20.4069 72.6289 20.2105 72.7541 19.8963L75.0093 15.576C75.4269 14.8298 76.5545 14.8298 76.9722 15.576Z"
          fill="#ED8A19"
        />
      )}
      {/* /star */}
      <defs>
        <clipPath id="clip0_1037_7">
          <rect x="5" y="5" width="90" height="90" rx="45" fill="white" />
        </clipPath>
      </defs>
    </Container>
  );
}

export default Trophy;
