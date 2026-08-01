import { Container, createTheme } from '@mantine/core';

export const theme = createTheme({
  components: {
    // Container centers itself with `margin-inline: auto`. Zeroing the inline
    // start margin left-aligns page content while keeping the max-width caps.
    Container: Container.extend({
      defaultProps: { ms: 0 }
    })
  }
});
