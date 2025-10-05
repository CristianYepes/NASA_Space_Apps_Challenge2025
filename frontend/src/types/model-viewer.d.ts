declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': {
      ref?: React.Ref<any>;
      src?: string;
      alt?: string;
      style?: React.CSSProperties;
      'camera-controls'?: boolean;
      'touch-action'?: string;
      'shadow-intensity'?: number;
      'environment-image'?: string;
      'min-camera-orbit'?: string;
      'max-camera-orbit'?: string;
      'field-of-view'?: string;
      'camera-target'?: string;
      'interaction-policy'?: string;
      'auto-rotate'?: boolean;
      'auto-rotate-delay'?: string;
      'rotation-per-second'?: string;
      [key: string]: any;
    };
  }
}



