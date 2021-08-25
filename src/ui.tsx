import {
    Container,
    Divider,
    Dropdown,
    render,
    SearchTextbox,
    Stack,
    Text,
    SegmentedControl,
  } from "@create-figma-plugin/ui";
  import { h, JSX } from "preact";
  import { useState } from "preact/hooks";

  import IconList from './IconList';
  
  function Plugin() {

    return (
      <Stack space="small">
          <IconList/>
      </Stack>
    );
  }
  export default render(Plugin);
  