import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Flag from '@/components/ui/Flag'
import { routePaths } from '@/config/routes'
import type { Country } from '@/features/countries/countries'
import type { Destination } from './destinations'

interface DestinationHeroProps {
  destination: Destination
  citizenship?: Country
}

interface BannerTheme {
  from: string
  via: string
  to: string
  ribbon: readonly string[]
}

const BANNER_THEMES: Record<string, BannerTheme> = {
  US: {
    from: '#0A3161',
    via: '#123A6B',
    to: '#7A1428',
    ribbon: ['#B31942', '#FFFFFF', '#0A3161'],
  },
  EU: {
    from: '#001B5C',
    via: '#003399',
    to: '#00266D',
    ribbon: ['#003399', '#FFCC00', '#003399'],
  },
  AE: {
    from: '#005C26',
    via: '#111111',
    to: '#8B0000',
    ribbon: ['#00732F', '#FFFFFF', '#000000', '#FF0000'],
  },
  IN: {
    from: '#C45C12',
    via: '#7A2E24',
    to: '#0B5C2E',
    ribbon: ['#FF9933', '#FFFFFF', '#138808'],
  },
  GB: {
    from: '#012169',
    via: '#1A2F66',
    to: '#8B0A1E',
    ribbon: ['#012169', '#FFFFFF', '#C8102E'],
  },
  CA: {
    from: '#8B0000',
    via: '#C8102E',
    to: '#5C0000',
    ribbon: ['#FF0000', '#FFFFFF', '#FF0000'],
  },
  TR: {
    from: '#9B0A14',
    via: '#E30A17',
    to: '#6B0610',
    ribbon: ['#E30A17', '#FFFFFF', '#E30A17'],
  },
  JP: {
    from: '#3B0710',
    via: '#8B0018',
    to: '#BC002D',
    ribbon: ['#FFFFFF', '#BC002D', '#FFFFFF'],
  },
}

const FALLBACK_THEME: BannerTheme = {
  from: '#0F766E',
  via: '#0D9488',
  to: '#06B6D4',
  ribbon: ['#FFFFFF66'],
}

export default function DestinationHero({
  destination,
  citizenship,
}: DestinationHeroProps) {
  const theme = BANNER_THEMES[destination.code] ?? FALLBACK_THEME

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(125deg, ${theme.from} 0%, ${theme.via} 48%, ${theme.to} 100%)`,
        }}
      />
      <BannerMotif code={destination.code} />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent"
      />

      <div className="pointer-events-none absolute inset-y-0 right-4 hidden w-[40%] items-center justify-center md:flex lg:right-10">
        <div className="relative rotate-6">
          <div className="absolute -inset-10 rounded-[2rem] bg-white/15 blur-3xl" />
          <span className="relative block drop-shadow-2xl">
            <Flag
              code={destination.code}
              className="rounded-2xl text-[8.5rem] ring-4 ring-white/25 lg:text-[11rem] xl:text-[13rem]"
            />
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Link
          to={routePaths.home}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          All destinations
        </Link>
        <div className="mt-6 flex max-w-2xl flex-col items-start gap-5 sm:flex-row sm:items-center">
          <span className="drop-shadow-xl">
            <Flag code={destination.code} className="rounded-lg text-7xl" />
          </span>
          <div>
            <p className="mb-3 inline-flex rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-sm font-semibold text-white shadow-sm backdrop-blur-sm">
              {citizenship
                ? `eVisa policy: ${citizenship.name} citizens to ${destination.name}`
                : 'Select your nationality to see country-specific requirements'}
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              {destination.name}
            </h1>
            <p className="mt-2 text-base text-white/85 sm:text-lg">
              {destination.tagline}
            </p>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 flex h-2">
        {theme.ribbon.map((color, index) => (
          <span
            key={`${color}-${index}`}
            className="flex-1"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </section>
  )
}

function BannerMotif({ code }: { code: string }) {
  switch (code) {
    case 'US':
      return <UsMotif />
    case 'EU':
      return <EuMotif />
    case 'AE':
      return <AeMotif />
    case 'IN':
      return <InMotif />
    case 'GB':
      return <GbMotif />
    case 'CA':
      return <CaMotif />
    case 'TR':
      return <TrMotif />
    case 'JP':
      return <JpMotif />
    default:
      return null
  }
}

function UsMotif() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, transparent 0 22px, rgba(179,25,66,0.7) 22px 36px)',
        }}
      />
      <svg className="absolute inset-0 size-full opacity-50" viewBox="0 0 800 240">
        {US_STARS.map(([x, y, size]) => (
          <Star key={`${x}-${y}`} x={x} y={y} size={size} />
        ))}
      </svg>
    </div>
  )
}

const US_STARS: ReadonlyArray<readonly [number, number, number]> = [
  [40, 28, 11],
  [78, 46, 8],
  [118, 24, 10],
  [156, 48, 7],
  [52, 72, 8],
  [98, 78, 11],
  [140, 70, 8],
  [34, 112, 9],
  [76, 108, 7],
  [122, 116, 10],
  [168, 102, 8],
]

function EuMotif() {
  const stars = Array.from({ length: 12 }, (_, index) => {
    const angle = ((index * 30 - 90) * Math.PI) / 180
    return {
      x: 620 + Math.cos(angle) * 78,
      y: 118 + Math.sin(angle) * 78,
    }
  })

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 size-full opacity-40"
      viewBox="0 0 800 240"
    >
      {stars.map((star) => (
        <Star
          key={`${star.x}-${star.y}`}
          x={star.x}
          y={star.y}
          size={13}
          fill="#FFCC00"
        />
      ))}
    </svg>
  )
}

function AeMotif() {
  return (
    <div aria-hidden="true" className="absolute inset-0 opacity-40">
      <div className="absolute inset-y-0 left-0 w-[18%] bg-[#FF0000]" />
      <div className="absolute inset-y-0 left-[18%] flex w-[82%] flex-col">
        <div className="flex-1 bg-[#00732F]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-black" />
      </div>
    </div>
  )
}

function InMotif() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-0 flex flex-col opacity-30">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>
      <svg
        className="absolute right-[18%] top-1/2 size-44 -translate-y-1/2 opacity-50 lg:size-56"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="#000080"
          strokeWidth="3"
        />
        <circle cx="50" cy="50" r="5" fill="#000080" />
        {Array.from({ length: 24 }, (_, index) => (
          <line
            key={index}
            x1="50"
            y1="50"
            x2="50"
            y2="14"
            stroke="#000080"
            strokeWidth="1.4"
            transform={`rotate(${index * 15} 50 50)`}
          />
        ))}
      </svg>
    </div>
  )
}

function GbMotif() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 size-full opacity-30"
      viewBox="0 0 800 240"
      preserveAspectRatio="none"
    >
      <rect width="800" height="240" fill="#012169" />
      <path d="M0 0 L800 240 M800 0 L0 240" stroke="white" strokeWidth="46" />
      <path d="M0 0 L800 240 M800 0 L0 240" stroke="#C8102E" strokeWidth="18" />
      <path d="M400 0 V240 M0 120 H800" stroke="white" strokeWidth="72" />
      <path d="M400 0 V240 M0 120 H800" stroke="#C8102E" strokeWidth="40" />
    </svg>
  )
}

function CaMotif() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-y-0 left-0 w-[28%] bg-white/10" />
      <div className="absolute inset-y-0 right-0 w-[28%] bg-white/10" />
      <svg
        className="absolute left-1/2 top-1/2 w-40 -translate-x-1/2 -translate-y-1/2 opacity-25 lg:w-56"
        viewBox="0 0 100 100"
      >
        <path
          fill="white"
          d="M50 8c1.4 8 12 11 14 18 6-2 12 5 8 11 10 1 11 10 4 13 6 7-1 14-7 12 1 8-6 13-11 10-1 7-8 11-8 11s-7-4-8-11c-5 3-12-2-11-10-6 2-13-5-7-12-7-3-6-12 4-13-4-6 2-13 8-11 2-7 12.6-10 14-18z"
        />
      </svg>
    </div>
  )
}

function TrMotif() {
  return (
    <svg
      aria-hidden="true"
      className="absolute left-[22%] top-1/2 w-52 -translate-y-1/2 opacity-20 lg:w-64"
      viewBox="0 0 120 120"
    >
      <path
        fill="white"
        fillRule="evenodd"
        d="M50 26a34 34 0 1 0 0 68 34 34 0 0 0 0-68Zm12 9a25 25 0 1 0 0 50 25 25 0 0 0 0-50Z"
      />
      <polygon
        fill="white"
        transform="translate(86 60) scale(0.52) rotate(18)"
        points="0,-22 6.4,-8.2 21,-7.2 9.6,2.8 13.5,16.8 0,9.2 -13.5,16.8 -9.6,2.8 -21,-7.2 -6.4,-8.2"
      />
    </svg>
  )
}

function JpMotif() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 size-full opacity-25" viewBox="0 0 800 240">
        {Array.from({ length: 18 }, (_, index) => (
          <line
            key={index}
            x1="620"
            y1="120"
            x2="800"
            y2="120"
            stroke="white"
            strokeWidth="10"
            transform={`rotate(${index * 20} 620 120)`}
          />
        ))}
      </svg>
      <div className="absolute right-[12%] top-1/2 size-40 -translate-y-1/2 rounded-full bg-[#BC002D] opacity-80 ring-[18px] ring-white/20 lg:size-56" />
    </div>
  )
}

function Star({
  x,
  y,
  size,
  fill = 'white',
}: {
  x: number
  y: number
  size: number
  fill?: string
}) {
  return (
    <polygon
      fill={fill}
      transform={`translate(${x} ${y}) scale(${size / 24})`}
      points="0,-12 3.5,-3.8 12,-3.2 5.5,2.4 7.6,11 0,6.2 -7.6,11 -5.5,2.4 -12,-3.2 -3.5,-3.8"
    />
  )
}
