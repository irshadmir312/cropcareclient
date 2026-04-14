import { NextResponse } from 'next/server';

interface WeatherDay {
  date: string;
  dayName: string;
  tempHigh: number;
  tempLow: number;
  rainProbability: number;
  windSpeed: number;
  condition: string;
  humidity: number;
}

function generateKashmirWeather(): WeatherDay[] {
  const conditions = ['sunny', 'cloudy', 'rainy', 'stormy', 'partly_cloudy'] as const;
  const today = new Date();
  const forecast: WeatherDay[] = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    const month = date.getMonth();
    const isSummer = month >= 4 && month <= 8;

    let tempHigh: number;
    let tempLow: number;
    let rainProb: number;
    let windSpeed: number;
    let condition: string;

    if (isSummer) {
      tempHigh = Math.floor(Math.random() * 10) + 25;
      tempLow = Math.floor(Math.random() * 5) + 15;
      rainProb = Math.floor(Math.random() * 40) + 10;
      windSpeed = Math.floor(Math.random() * 15) + 5;
    } else {
      tempHigh = Math.floor(Math.random() * 10) + 5;
      tempLow = Math.floor(Math.random() * 8) - 5;
      rainProb = Math.floor(Math.random() * 50) + 20;
      windSpeed = Math.floor(Math.random() * 20) + 5;
    }

    const rand = Math.random();
    if (rand < 0.3) condition = 'sunny';
    else if (rand < 0.55) condition = 'partly_cloudy';
    else if (rand < 0.75) condition = 'cloudy';
    else if (rand < 0.9) condition = 'rainy';
    else condition = 'stormy';

    if (condition === 'rainy' || condition === 'stormy') {
      rainProb = Math.max(rainProb, condition === 'stormy' ? 70 : 55);
      windSpeed = condition === 'stormy' ? windSpeed + 15 : windSpeed + 5;
    }

    forecast.push({
      date: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      tempHigh,
      tempLow,
      rainProbability: Math.min(rainProb, 100),
      windSpeed,
      condition,
      humidity: Math.floor(Math.random() * 30) + 50,
    });
  }

  return forecast;
}

export async function GET() {
  try {
    const forecast = generateKashmirWeather();

    const currentWeather = {
      location: 'Srinagar, Kashmir',
      temperature: forecast[0].tempHigh,
      condition: forecast[0].condition,
      humidity: forecast[0].humidity,
      windSpeed: forecast[0].windSpeed,
      rainProbability: forecast[0].rainProbability,
    };

    return NextResponse.json({
      current: currentWeather,
      forecast,
    });
  } catch (error) {
    console.error('Error generating weather:', error);
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }
}
