var bgShader = [

    "precision mediump float;",

    "uniform float     time;",
    "uniform vec2      resolution;",
    "uniform vec2      mouse;",
    "uniform sampler2D iChannel0;",

    "void main( void ) {",

    "vec2 uv = gl_FragCoord.xy / resolution.xy;",
    "float pos = (gl_FragCoord.y / resolution.y);",
    "float mouse_dist = length(vec2((mouse.x - uv.x) * (resolution.x / resolution.y) , mouse.y - uv.y));",
    "float distortion = clamp(1.0 - (mouse_dist + 0.1) * 3.0, 0.0, 1.0);",

    "pos -= (distortion * distortion) * 0.1;",

    "float c = sin(pos * 400.0) * 0.4 + 0.4;",
    "c = pow(c, 0.2);",
    "c *= 0.2;",

    "float band_pos = fract(time * 0.1) * 3.0 - 1.0;",
    "c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;",

    "c += distortion * 0.08;",

    "gl_FragColor = texture2D(iChannel0, uv);",
    "}"
];
