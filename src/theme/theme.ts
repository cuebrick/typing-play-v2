interface ITheme {
  presets: {
    light: {
      [key: string]: string | number;
    };
    dark: {
      [key: string]: string | number;
    };
  };
  colors: {
    [key: string]: string | number;
  };
  fonts: {
    [key: string]: string | number;
  };
  layout: {
    [key: string]: string | number;
  };
}

export const defaultTheme: ITheme = {
  presets: {
    light: {
      text: '#333',
      gray: '#666',
      background: '#DDD',
      buttonBackground: '#eff7fd',
      buttonText: '#bdd7df'
    },
    dark: {
      text: '#DDD',
      background: '#333'
    }
  },
  colors: {
    confirm: '#0cf'
  },
  fonts: {
    size: 16,
    typingItemSize: 32
  },
  layout: {
    itemGap: 10,
    typingItemLength: 15, // 한 줄에 들어가는 타자 길이
    typingItemGap: 20
  }
};
