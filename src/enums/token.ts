export enum TokenLayer {
  Primitive = 'primitive',
  Semantic = 'semantic',
  Component = 'component',
}

export enum TokenTheme {
  Light = 'light',
  Dark = 'dark',
}

export enum TokenType {
  Color = 'color',
  Dimension = 'dimension',
  FontFamily = 'fontFamily',
  FontWeight = 'fontWeight',
  Duration = 'duration',
  CubicBezier = 'cubicBezier',
  Number = 'number',
}

export enum SemanticTokenGroup {
  Surface = 'surface', // background
  Content = 'content', // foreground / text / icon
  Border = 'border', // strokes / dividers
  Interactive = 'interactive', // brand / action colors
  Feedback = 'feedback', // status communication
}
