"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"

const vertexShader = `
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`

const fragmentShader = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_intensity;
  
  vec3 hash3(vec2 p) {
    vec3 q = vec3(dot(p, vec2(127.1, 311.7)), 
                  dot(p, vec2(269.5, 183.3)), 
                  dot(p, vec2(419.2, 371.9)));
    return fract(sin(q) * 43758.5453);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    return mix(mix(dot(hash3(i + vec2(0.0,0.0)).xy, f - vec2(0.0,0.0)), 
                   dot(hash3(i + vec2(1.0,0.0)).xy, f - vec2(1.0,0.0)), u.x),
               mix(dot(hash3(i + vec2(0.0,1.0)).xy, f - vec2(0.0,1.0)), 
                   dot(hash3(i + vec2(1.0,1.0)).xy, f - vec2(1.0,1.0)), u.x), u.y);
  }
  
  float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 0.25;
    
    for (int i = 0; i < 10; i++) {
      if (i >= octaves) break;
      value += amplitude * noise(p * frequency);
      amplitude *= 0.52;
      frequency *= 1.13;
    }
    return value;
  }
  
  float voronoi(vec2 p) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float md = 50.0;
    
    for (int i = -2; i <= 2; i++) {
      for (int j = -2; j <= 2; j++) {
        vec2 g = vec2(i, j);
        vec2 o = hash3(n + g).xy;
        o = 0.5 + 0.41 * sin(u_time * 1.5 + 6.28 * o);
        vec2 r = g + o - f;
        float d = dot(r, r);
        md = min(md, d);
      }
    }
    return sqrt(md);
  }
  
  float plasma(vec2 p, float time) {
    float a = sin(p.x * 8.0 + time * 2.0);
    float b = sin(p.y * 8.0 + time * 1.7);
    float c = sin((p.x + p.y) * 6.0 + time * 1.3);
    float d = sin(sqrt(p.x * p.x + p.y * p.y) * 8.0 + time * 2.3);
    return (a + b + c + d) * 0.5;
  }
  
  vec2 curl(vec2 p, float time) {
    float eps = 0.5;
    float n1 = fbm(p + vec2(eps, 0.0), 6);
    float n2 = fbm(p - vec2(eps, 0.0), 6);
    float n3 = fbm(p + vec2(0.0, eps), 6);
    float n4 = fbm(p - vec2(0.0, eps), 6);
    
    return vec2((n3 - n4) / (2.0 * eps), (n2 - n1) / (2.0 * eps));
  }

  float grain(vec2 uv, float time) {
    vec2 seed = uv * time;
    return fract(sin(dot(seed, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 st = (uv - 0.5) * 2.0;
    st.x *= u_resolution.x / u_resolution.y;
    
    float time = u_time * 0.25;
    vec2 curlForce = curl(st * 2.0, time) * 0.6;
    vec2 flowField = st + curlForce;
    
    float dist1 = fbm(flowField * 1.5 + time * 1.2, 8) * 0.4;
    float dist2 = fbm(flowField * 2.3 - time * 0.8, 6) * 0.3;
    float dist3 = fbm(flowField * 3.1 + time * 1.8, 4) * 0.2;
    float dist4 = fbm(flowField * 4.7 - time * 1.1, 3) * 0.15;
    
    float cells = voronoi(flowField * 2.5 + time * 0.5);
    cells = smoothstep(0.1, 0.7, cells);
    
    float plasmaEffect = plasma(flowField + vec2(dist1, dist2), time * 1.5) * 0.2;
    float totalDist = dist1 + dist2 + dist3 + dist4 + plasmaEffect;
    
    float streak1 = sin((st.x + totalDist) * 15.0 + time * 3.0) * 0.5 + 0.5;
    float streak2 = sin((st.x + totalDist * 0.7) * 25.0 - time * 2.0) * 0.5 + 0.5;
    float streak3 = sin((st.x + totalDist * 1.3) * 35.0 + time * 4.0) * 0.5 + 0.5;
    
    streak1 = smoothstep(0.3, 0.7, streak1);
    streak2 = smoothstep(0.2, 0.8, streak2);
    streak3 = smoothstep(0.4, 0.6, streak3);
    
    float combinedStreaks = streak1 * 0.6 + streak2 * 0.4 + streak3 * 0.5;
    
    float shape1 = 1.0 - abs(st.x + totalDist * 0.6);
    float shape2 = 1.0 - abs(st.x + totalDist * 0.4 + sin(st.y * 3.0 + time) * 0.15);
    float shape3 = 1.0 - abs(st.x + totalDist * 0.8 + cos(st.y * 2.0 - time) * 0.1);
    
    shape1 = smoothstep(0.0, 1.0, shape1);
    shape2 = smoothstep(0.1, 0.9, shape2);
    shape3 = smoothstep(0.2, 0.8, shape3);
    
    float finalShape = max(shape1 * 0.8, max(shape2 * 0.6, shape3 * 0.4));
    
    vec3 color1 = vec3(1.0, 0.1, 0.6);
    vec3 color2 = vec3(1.0, 0.3, 0.1);
    vec3 color3 = vec3(0.9, 0.1, 1.0);
    vec3 color4 = vec3(0.1, 0.5, 1.0);
    vec3 color5 = vec3(0.1, 1.0, 0.9);
    vec3 color6 = vec3(0.3, 0.1, 0.9);
    vec3 color7 = vec3(1.0, 0.8, 0.1);
    
    float gradient = 1.0 - uv.y;
    float colorNoise = fbm(flowField * 3.0 + time * 0.5, 4) * 0.5 + 0.5;
    float colorShift = sin(time * 1.5 + st.y * 2.0) * 0.5 + 0.5;
    
    vec3 finalColor;
    
    float t1 = smoothstep(0.85, 1.0, gradient);
    float t2 = smoothstep(0.7, 0.85, gradient);
    float t3 = smoothstep(0.5, 0.7, gradient);
    float t4 = smoothstep(0.3, 0.5, gradient);
    float t5 = smoothstep(0.15, 0.3, gradient);
    float t6 = smoothstep(0.0, 0.15, gradient);
    
    finalColor = mix(color6, color7, t6);
    finalColor = mix(finalColor, color5, t5);
    finalColor = mix(finalColor, color4, t4);
    finalColor = mix(finalColor, color3, t3);
    finalColor = mix(finalColor, color2, t2);
    finalColor = mix(finalColor, color1, t1);
    
    finalColor = mix(finalColor, color1, colorNoise * 0.82);
    finalColor = mix(finalColor, color5, colorShift * 0.5);
    
    vec2 aberration = curlForce * 0.02;
    vec3 aberrationColor = finalColor;
    aberrationColor.r = mix(finalColor.r, color1.r, length(aberration) * 2.0);
    aberrationColor.b = mix(finalColor.b, color4.b, length(aberration) * 1.5);
    aberrationColor.g = mix(finalColor.g, color5.g, length(aberration) * 1.2);
    
    float pulse1 = sin(time * 3.0 + st.y * 6.0) * 0.5 + 0.5;
    float pulse2 = sin(time * 4.5 - st.y * 8.0) * 0.5 + 0.5;
    float energyPulse = smoothstep(0.3, 0.7, pulse1 * pulse2);
    
    float intensity = finalShape * combinedStreaks * (1.0 + energyPulse * 0.4);
    intensity *= (1.0 + cells * 0.2);
    intensity *= u_intensity;
    
    vec2 mouse = u_mouse / u_resolution.xy;
    mouse = (mouse - 0.5) * 2.0;
    mouse.x *= u_resolution.x / u_resolution.y;
    
    float mouseInfluence = 1.0 - length(st - mouse) * 0.6;
    mouseInfluence = max(0.0, mouseInfluence);
    mouseInfluence = smoothstep(0.0, 1.0, mouseInfluence);
    
    intensity += mouseInfluence * 0.6;
    aberrationColor = mix(aberrationColor, color1, 0.3);
    
    vec3 result = aberrationColor * intensity;
    
    float bloom = smoothstep(0.4, 1.0, intensity) * 0.54;
    result += bloom * finalColor;
    
    result = pow(result, vec3(0.85));
    result = mix(result, result * result, 0.2);
    
    float vignette = 1.0 - length(uv - 0.5) * 0.85;
    vignette = smoothstep(0.2, 1.0, vignette);
    
    vec3 bgColor = vec3(0.02, 0.01, 0.12) + finalColor * 0.03;
    result = mix(bgColor, result, smoothstep(0.0, 0.4, intensity));
    result *= vignette;
    
    result = mix(vec3(dot(result, vec3(0.299, 0.587, 0.114))), result, 1.3);
    float grainAmount = 0.11;
    float grainValue = grain(uv, time * 0.5) * 2.0 - 1.0;
    result += grainValue * grainAmount;
    float scanline = sin(uv.y * u_resolution.y * 2.0) * 0.04;
    result += scanline;
    
    gl_FragColor = vec4(result, 1.0);
  }
`

export type HeroNavLink = {
  text: string
  href: string
  gradient: string
  shimmer?: boolean
}

export interface RevolutionHeroProps {
  eyebrow?: string[]
  navLinks?: HeroNavLink[]
  quoteLines?: React.ReactNode[]
  siteLabel?: string
}

interface NavLinkProps {
  children: React.ReactNode
  href: string
  gradient: string
  shimmer?: boolean
}

function NavLink({ children, href, gradient, shimmer = false }: NavLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isExternal = href.startsWith("http")

  useEffect(() => {
    const link = linkRef.current
    if (!link) return

    const handleMouseEnter = () => {
      setIsHovered(true)
      gsap.to(link, {
        scale: 1.05,
        rotationX: -2,
        z: 20,
        duration: 0.6,
        ease: "power3.out",
      })

      gsap.to(link, {
        textShadow: "0 5px 20px rgba(255,255,255,0.2)",
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      gsap.to(link, {
        scale: 1,
        rotationX: 0,
        z: 0,
        duration: 0.6,
        ease: "power3.out",
      })

      gsap.to(link, {
        textShadow: "0 0 0px rgba(255,255,255,0)",
        duration: 0.5,
        ease: "power3.out",
      })
    }

    link.addEventListener("mouseenter", handleMouseEnter)
    link.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter)
      link.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <a
      ref={linkRef}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={`block mb-5 cursor-pointer text-[2.7rem] font-black leading-[0.92] tracking-[0.02em] transition-all duration-300 transform-gpu md:mb-6 md:text-[4.35rem] lg:text-[6.8rem] ${
        shimmer ? "hero-nav-shimmer" : ""
      } ${
        isHovered ? "z-10" : ""
      }`}
      style={{
        fontFamily: '"Segoe UI"',
        background: gradient,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        backgroundSize: shimmer ? "180% 180%" : undefined,
        backgroundPosition: shimmer ? "50% 50%" : undefined,
        textShadow: isHovered
          ? shimmer
            ? "0 0 16px rgba(255,200,110,0.18), 0.45px 0 0 rgba(255,224,164,0.8), -0.45px 0 0 rgba(255,224,164,0.8)"
            : "0 0 18px rgba(255,255,255,0.12), 0.6px 0 0 rgba(255,255,255,0.92), -0.6px 0 0 rgba(255,255,255,0.92)"
          : shimmer
            ? "0.38px 0 0 rgba(255,214,148,0.74), -0.38px 0 0 rgba(255,214,148,0.74)"
            : "0.45px 0 0 rgba(255,255,255,0.86), -0.45px 0 0 rgba(255,255,255,0.86)",
      }}
    >
      {children}
    </a>
  )
}

export default function RevolutionHero({
  eyebrow = ["Break the boundaries,", "Unleash your potential"],
  navLinks,
  quoteLines = [
    "The future belongs to those",
    "who dare to dream bigger",
    "Every revolution starts with a single spark",
    "Your moment is now.",
    "Your power is limitless.",
    "Your impact will be legendary.",
  ],
  siteLabel = "www.revolution.com",
}: RevolutionHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const intensityRef = useRef({ intensity: 1.0 })
  const programRef = useRef<WebGLProgram | null>(null)
  const bufferRef = useRef<WebGLBuffer | null>(null)
  const positionLocationRef = useRef<number>(0)
  const timeLocationRef = useRef<WebGLUniformLocation | null>(null)
  const resolutionLocationRef = useRef<WebGLUniformLocation | null>(null)
  const mouseLocationRef = useRef<WebGLUniformLocation | null>(null)
  const intensityLocationRef = useRef<WebGLUniformLocation | null>(null)
  const startTimeRef = useRef<number>(Date.now())
  const animationFrameRef = useRef<number | null>(null)

  const defaultNavLinks = useMemo<HeroNavLink[]>(
    () => [
      { text: "IGNITE", href: "/ignite", gradient: "linear-gradient(135deg, #ffffff, #cccccc)" },
      { text: "TRANSFORM", href: "/transform", gradient: "linear-gradient(135deg, #ffffff, #cccccc)" },
      { text: "DOMINATE", href: "/dominate", gradient: "linear-gradient(135deg, #ffffff, #cccccc)" },
      { text: "EVOLVE", href: "/evolve", gradient: "linear-gradient(135deg, #ffffff, #cccccc)" },
    ],
    [],
  )

  const resolvedNavLinks = navLinks ?? defaultNavLinks
  const primaryQuoteLines = quoteLines.slice(0, 1)
  const secondaryQuoteLines = quoteLines.slice(1, -2)
  const closingQuoteLines = quoteLines.slice(-2)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl")
    if (!gl) return

    const shaders: WebGLShader[] = []
    const intensityState = intensityRef.current

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null

      gl.shaderSource(shader, source)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }

      shaders.push(shader)
      return shader
    }

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShader)
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShader)

    if (!vertShader || !fragShader) return

    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      return
    }

    programRef.current = program

    const buffer = gl.createBuffer()
    if (!buffer) return

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    bufferRef.current = buffer

    positionLocationRef.current = gl.getAttribLocation(program, "position")
    timeLocationRef.current = gl.getUniformLocation(program, "u_time")
    resolutionLocationRef.current = gl.getUniformLocation(program, "u_resolution")
    mouseLocationRef.current = gl.getUniformLocation(program, "u_mouse")
    intensityLocationRef.current = gl.getUniformLocation(program, "u_intensity")

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) * window.devicePixelRatio
      mouseRef.current.y = (rect.height - (e.clientY - rect.top)) * window.devicePixelRatio

      const tweenState = intensityState
      gsap.killTweensOf(tweenState)

      gsap.to(tweenState, {
        intensity: 1.15,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(tweenState, {
        intensity: 1.0,
        duration: 1.0,
        delay: 0.1,
        ease: "power2.out",
      })
    }

    const renderFrame = () => {
      const time = (Date.now() - startTimeRef.current) * 0.001

      if (
        programRef.current &&
        bufferRef.current &&
        timeLocationRef.current &&
        resolutionLocationRef.current &&
        mouseLocationRef.current &&
        intensityLocationRef.current
      ) {
        gl.useProgram(programRef.current)
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferRef.current)
        gl.enableVertexAttribArray(positionLocationRef.current)
        gl.vertexAttribPointer(positionLocationRef.current, 2, gl.FLOAT, false, 0, 0)

        gl.uniform1f(timeLocationRef.current, time)
        gl.uniform2f(resolutionLocationRef.current, gl.canvas.width, gl.canvas.height)
        gl.uniform2f(mouseLocationRef.current, mouseRef.current.x, mouseRef.current.y)
        gl.uniform1f(intensityLocationRef.current, intensityState.intensity)

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }

      animationFrameRef.current = requestAnimationFrame(renderFrame)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    animationFrameRef.current = requestAnimationFrame(renderFrame)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      gsap.killTweensOf(intensityState)

      if (bufferRef.current) {
        gl.deleteBuffer(bufferRef.current)
      }

      if (programRef.current) {
        gl.deleteProgram(programRef.current)
      }

      shaders.forEach((shader) => gl.deleteShader(shader))
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ background: "#000510" }} />

      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
        <div className="text-left">
          {eyebrow.map((line) => (
            <p
              key={line}
              className="text-sm font-bold uppercase tracking-wider text-gray-300 md:text-base"
              style={{ fontFamily: '"Segoe UI"' }}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="flex flex-col justify-between items-end md:flex-row">
          <nav className="mb-8 text-left md:mb-0">
            {resolvedNavLinks.map((link) => (
              <NavLink key={link.text} href={link.href} gradient={link.gradient} shimmer={link.shimmer}>
                {link.text}
              </NavLink>
            ))}
          </nav>

          <div className="max-w-xs text-right text-xs text-gray-300 md:text-sm" style={{ fontFamily: '"Segoe UI"' }}>
            {primaryQuoteLines.map((line, index) => (
              <p key={index} className="mb-2 font-semibold text-white">
                {line}
              </p>
            ))}
            {secondaryQuoteLines.map((line, index) => (
              <p key={index} className="mb-2 text-gray-400">
                {line}
              </p>
            ))}
            <div className="mt-4">
              {closingQuoteLines.map((line, index) => (
                <p key={index} className="mb-2 text-gray-400">
                  {line}
                </p>
              ))}
            </div>
            <p className="mt-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text font-bold text-transparent">
              {siteLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Component() {
  return <RevolutionHero />
}
