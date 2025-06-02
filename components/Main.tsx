// Contoh halaman utama (pages/index.tsx)
import { useEffect, useState, Suspense, useRef } from 'react';
import Head from 'next/head';
import { AnimatePresence, motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import dynamic from "next/dynamic"; import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';


import Balloon from './Ballon';
import BirthdayBunting from './BirthRope';
import BirthdayTrumpet from './BirthdayTrumpet';
import FullscreenConfetti from './FullScreenConvetti';
import GiftBox from './GiftBox';
const DrawingCanvas = dynamic(() => import('@/components/DrawingCanvas'), { ssr: false });

type Blade = {
    x: number;
    height: number;
    offsetFactor: number;
};

const generateBladeGroup = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
        x: i * 80,
        height: 100 + Math.random() * 20,
        offsetFactor: Math.random() * 2 - 1,
    }));

const blades = generateBladeGroup(10);

export default function PageMain() {
    const [signatureData, setSignatureData] = useState<string | null>(null);
    const [pageID, setPageID] = useState<number | null>(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePageChange = (newPageID: number, sign: string | null) => {
        setPageID(newPageID);

        if (sign) {
            audioRef.current?.play();
            setSignatureData(sign);
        }
    };

    useEffect(() => {
        setPageID(0);
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.4;
            audio.play().catch((e) => console.log('Autoplay blocked:', e));
        }
    }, []);

    return (
        <div className="w-full">
            <audio ref={audioRef} src="/birthday-fun.mp3" loop preload="auto" />
            {
                signatureData && (
                    <motion.div
                        key="page-img"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-0 left-0 w-full"
                    >
                        <div className='w-full relative z-10'>
                            <img
                                src={signatureData}
                                alt="signature"
                                className="h-20 absolute right-0"
                            />
                        </div>
                    </motion.div>
                )
            }
            <AnimatePresence mode="wait">
                {
                    pageID === 0 && (
                        <motion.div
                            key="page-0"
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute top-0 left-0 w-full"
                        >
                            <SplashScreen onSignatureData={(s) => handlePageChange(1, s)} />
                        </motion.div>
                    )
                }

                {pageID === 1 && (
                    <motion.div
                        key="page-1"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute top-0 left-0 w-full"
                    >
                        <div className="fixed inset-0 bg-[#FF9A9A] flex items-center justify-center ">
                            <ScreenTwo onPageChange={(s) => handlePageChange(s, null)} />
                        </div>
                    </motion.div>
                )}

                {pageID === 2 && (
                    <motion.div
                        key="page-2"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute top-0 left-0 w-full"
                    >
                        <div className="fixed inset-0 bg-[#FFF2EB] flex items-center justify-center ">
                            <ScreenThree onPageChange={(s) => handlePageChange(s, null)} />
                        </div>
                    </motion.div>
                )}

                {pageID === 3 && (
                    <motion.div
                        key="page-3"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute top-0 left-0 w-full"
                    >
                        <div className="fixed inset-0 bg-[#FFF2EB] flex items-center justify-center ">
                            <BirthdayCakeSVG onPageChange={(s) => handlePageChange(s, null)} />
                        </div>
                    </motion.div>
                )}

                {pageID === 4 && (
                    <motion.div
                        key="page-4"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute top-0 left-0 w-full"
                    >
                        <div className="fixed inset-0 bg-[#FF9A9A] flex items-center justify-center ">
                            <BirthdayPage onPageChange={(s) => handlePageChange(s, null)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <SpringGrass />
        </div>
    )
}

function SplashScreen({ onSignatureData }: { onSignatureData: (data: string | null) => void }) {
    return (
        <div className="fixed inset-0 bg-[#FF9A9A] flex items-center justify-center ">
            <div>
                <p className="text-2xl text-white font-bold">Coba paraf nyaa....</p>
                <div className='my-2'>
                    <DrawingCanvas onFinishDrawing={onSignatureData} />
                    <span className='text-sm'>
                        lepas jarinya kalo udah parafnya yaa...
                    </span>
                </div>
            </div>
        </div>
    );
}

function ScreenTwo({ onPageChange }: { onPageChange: (data: number) => void }) {
    const [clickedIndex, setClickedIndex] = useState<number>(0);
    const [countDown, setCountDown] = useState<number>(5);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const handleClick = () => {
        if (document && clickedIndex < 21) {
            setClickedIndex(clickedIndex + 1);
            const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
            if (modal && ((clickedIndex + 1) === 21)) {
                setIsDisabled(true);
                modal.showModal();
            }
        }
    }

    useEffect(() => {
        setCountDown(5);
        const timer = setInterval(() => {
            setCountDown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isDisabled]);

    return (
        <div className="min-h-screen items-center justify-center w-full relative">
            <Balloon countBallons={21} isRandom={true} onClickedBallon={() => handleClick()} />
            <div className='flex flex-col w-full justify-center items-center min-h-screen'>
                <span className={`mb-8 text-4xl font-semibold ${countDown === 0 ? '' : 'border-2 p-2 rounded-4xl'}`}>{countDown === 0 ? '' : countDown}</span>
                <span className='mb-8 text-xl font-semibold'>pukul balon nya biar nambah skor</span>
                <span>skor tertinggi : 20</span>
                <span className='mt-8'>skor araa</span>
                <span className='ml-2 text-2xl font-bold'>{clickedIndex}</span>
            </div>
            <dialog id="my_modal_2" className="modal ">
                <div className="modal-box bg-[#FFFBDE] text-black">
                    <h3 className="font-bold text-lg">kerenn dahhh</h3>
                    <p className="py-4 font-semibold">skor araa : {clickedIndex}</p>
                    <p>bentar - bentar kayak angka sesuatu ngga sih</p>
                    <p>coba tebakk dehhh</p>
                    <div className="modal-action">
                        {
                            countDown === 0 ? (
                                <form method="dialog">
                                    <button className="btn btn-accent" onClick={() => onPageChange(2)}>lanjut</button>
                                </form>
                            ) : (
                                <button className="btn">{countDown}</button>
                            )
                        }
                    </div>
                </div>
            </dialog>
        </div>
    );
}

function ScreenThree({ onPageChange }: { onPageChange: (data: number) => void }) {
    const [dragCount, setDragCount] = useState(0);
    const [showMsg, setShowMsg] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    useEffect(() => {
        if (dragCount === 30) {
            onPageChange(3);
        }
        if (dragCount > 20) {
            setShowMsg(true);
        }
    }, [dragCount])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-pink-100 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <BirthdayBunting />
                <motion.div
                    onDragStart={() => setDragCount(dragCount + 1)}
                    drag
                    style={{
                        x,
                        y,
                        rotateX,
                        rotateY,
                        perspective: 1000,
                    }}
                    dragElastic={0.2}
                    dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                    className="cursor-grab text-center p-4"
                >
                    <h1 className="text-lg md:text-5xl font-bold text-pink-800">
                        ohh iya,
                    </h1>
                    <h1 className="text-lg md:text-5xl font-bold text-pink-800">
                        kalau ulang tahun pasti ada kue apa?
                    </h1>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 4, duration: 0.5 }}
                        className="mt-4 text-2xl md:text-4xl text-pink-600"
                    >
                        yap, kue ulang tahun 🎂
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 4, duration: 0.5 }}
                        className="text-sm mt-8 md:mt-10 lg:mt-20 text-pink-600"
                    >
                        <div>
                            <BirthdayTrumpet dragCount={dragCount} />
                            tarik-tarik terompetnya,<br />buat liat kue ulang tahun araaaaaa
                        </div>
                    </motion.h2>

                    {showMsg && (
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="text-sm mt-8 md:mt-10 lg:mt-20 text-pink-600"
                        >
                            <div>
                                bentar lagi kue ulang tahunnya muncul, <br />
                                terus tarikkk
                            </div>
                        </motion.h2>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}

function BirthdayCakeSVG({ onPageChange }: { onPageChange: (data: number) => void }) {
    const texts = [
        "ini dia kue dan lilinnya raa",
        "ehh iya belum nyala lilinnya",
        "selamat ulang tahun!\nAraaaaaaaaaa",
        "waktu yang udah kelewat,",
        "bakal terus keganti sama waktu yang baru",
        "lakuin semua yang araa mau",
        "araa bikin happy",
        "araa bikin bahagia",
        "araa bikin semangat",
        "fokus sama apa yang araa tuju",
        "gausah mikirin umur, karena cuma angka",
        "wish you all the best",
        "ayoo tiupp lilinnya, keburu mati apinya...",
        "yeayyyyyyyy, sekali lagi mau ucapin",
        "Selamat Ulang Tahun Araaaaaaa",
        " - Pengagum Rahasia (kang ahmad rivaiy) ☺️"
    ];
    const [index, setIndex] = useState(0);
    const [lilinOn, setLilinOn] = useState(false);
    const [showConvetti, setShowConvetti] = useState(false);
    const [showGift, setShowGift] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLilinOn(true);
            const candleFlame = document.querySelector('.candle-flame') as HTMLElement;
            if (candleFlame) {
                candleFlame.style.display = 'block';
            }
        }, 9000);

        setTimeout(() => {
            setShowConvetti(true);
        }, 9000);

        setTimeout(() => {
            setLilinOn(false);
        }, (texts.length - 3) * 5000);
    }, []);


    return (
        <div className="min-h-screen items-center justify-center w-full relative">
            {
                showConvetti && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="text-sm text-pink-600"
                    >
                        <FullscreenConfetti />
                    </motion.div>
                )
            }
            <div className='w-full flex justify-center items-center min-h-screen'>
                <svg width="200" height="250" viewBox="0 0 200 250">
                    {/* Piring */}
                    <ellipse cx="100" cy="210" rx="70" ry="10" fill="#d9d9d9" />

                    {/* Lapisan Atas */}
                    <rect x="75" y="90" width="50" height="30" rx="8" fill="#FF7373" />
                    {/* Lapisan Tengah */}
                    <IceCreamCone x={385} y={85} scale={0.3} rotate={10} />
                    <rect x="60" y="120" width="80" height="40" rx="10" fill="#FF9999" />
                    <path d="M60 130 Q80 110 100 130 T140 130 V160 H60 Z" fill="#FF7F7F" />

                    {/* Lapisan Bawah Kue */}
                    <rect x="40" y="160" width="120" height="50" rx="10" fill="#FFD4D4" />
                    <IceCreamCone x={105} y={255} scale={0.3} rotate={-10} />
                    <path d="M40 170 Q60 150 80 170 T120 170 T160 170 V210 H40 Z" fill="#FFB3B3" />


                    {/* Lilin */}
                    <rect x="98" y="65" width="4" height="25" fill="#FFD700" />
                    <circle cx="100" cy="60" r="6" fill="#FF4500" />

                    {/* Api lilin */}
                    {lilinOn && (
                        <g className="candle-flame" transform={`translate(100, 20)`}>
                            <path
                                d="M0 0 Q-10 20 0 40 Q10 20 0 0"
                                fill="#FFA500"
                            >
                                <animate
                                    attributeName="d"
                                    dur="1.5s"
                                    repeatCount="indefinite"
                                    values="
                            M0 0 Q-10 20 0 40 Q10 20 0 0;
                            M0 1 Q-8 18 2 38 Q8 18 0 1;
                            M0 2 Q-8 28 2 48 Q8 18 0 1;
                            M0 0 Q-10 20 0 40 Q10 20 0 0
                        "
                                />
                            </path>
                        </g>
                    )}
                </svg>
            </div>
            <div className='min-h-screen top-[-200px] w-full text-2xl font-bold absolute flex justify-center items-center'>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={texts[index]}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.8 }}
                        className='text-black text-[21px] text-center'
                    >
                        {texts[index]}
                    </motion.span>
                </AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: texts.length * 5, duration: 0.5 }}
                    className="text-sm cursor-pointer"
                    onClick={() => onPageChange(4)}
                >
                    <GiftBox />
                </motion.div>
            </div>
        </div>
    );
}

function IceCreamCone({ x, y, scale = 1, rotate = 0 }: { x: number; y: number; scale?: number, rotate?: number }) {
    return (
        <svg height={250} width={150} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier" transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotate})`} > <g> <path style={{ fill: "#9FDEE2" }} d="M139.49,216.038l224.957-0.003c31.595-84.669-39.815-86.57-39.815-86.57 c7.38-80.588-72.387-54.262-78.984-118.797c-39.18,24.646-30.96,63.823-30.96,63.823c-41.705,14.535-29.704,61.925-29.704,61.925 C138.227,151.583,139.49,216.038,139.49,216.038z"></path> <polygon style={{ fill: "#F99A98" }} points="364.445,216.036 139.49,216.038 132.15,216.036 148.326,312.718 166.476,312.718 345.517,312.718 363.673,312.718 379.853,216.038 "></polygon> <polygon style={{ fill: "#F9EACD" }} points="345.517,312.718 166.476,312.718 210.526,501.335 301.471,501.335 335.954,353.658 "></polygon> </g> <g> <path style={{ fill: "#000003" }} d="M387.989,209.143c-2.025-2.394-5.004-3.775-8.14-3.775h-0.741 c6.853-25.188,5.073-45.711-5.338-61.144c-10.513-15.584-27.11-21.623-38-23.958c0.289-42.49-24.708-56.733-45.078-68.341 c-17.859-10.179-31.967-18.22-34.431-42.342c-0.376-3.671-2.621-6.887-5.935-8.504c-3.316-1.618-7.233-1.406-10.357,0.558 c-33.402,21.007-37.106,51.183-36.642,66.079c-16.376,8.191-26.568,22.383-29.66,41.48c-1.261,7.787-1.062,15.064-0.527,20.484 c-34.472,16.549-42.169,56.851-43.856,76.094c-2.035,0.569-3.882,1.721-5.273,3.366c-2.027,2.395-2.898,5.559-2.381,8.653 l16.176,96.682c0.861,5.141,5.311,8.907,10.521,8.907h9.692l42.121,180.375c1.128,4.827,5.432,8.242,10.388,8.242h90.945 c4.956,0,9.261-3.415,10.388-8.242l42.121-180.375h9.692c5.211,0,9.661-3.767,10.521-8.907l16.176-96.682 C390.886,214.703,390.016,211.538,387.989,209.143z M179.836,150.294c8.578,12.496,24.139,18.126,40.123,18.126 c6.105,0,12.269-0.819,18.128-2.389c5.692-1.524,9.069-7.374,7.544-13.064c-1.525-5.69-7.375-9.069-13.065-7.543 c-15.251,4.083-33.458,1.325-37.281-11.808c-0.306-1.358-2.238-10.636-0.558-21.005c2.293-14.166,9.974-23.34,23.472-28.045 c5.065-1.764,8.046-6.943,6.944-12.192c-0.217-1.115-4.309-23.625,13.924-42.757c8.204,22.119,26.112,32.324,41.063,40.846 c20.812,11.861,37.25,21.23,33.881,58.03c-0.269,2.937,0.689,5.853,2.648,8.058c1.959,2.204,4.742,3.5,7.69,3.579 c0.212,0.005,21.588,0.988,31.735,16.028c7.471,11.075,7.705,27.621,0.763,49.212H150.774 C152.413,190.208,158.361,162.604,179.836,150.294z M327.494,342.99h-30.336c-5.892,0-10.667,4.776-10.667,10.667 s4.776,10.667,10.667,10.667h25.353l-29.504,126.343h-74.019l-39.062-167.282h152.145L327.494,342.99z M354.641,302.05H157.357 l-12.607-75.347h219.623c0.025,0,0.048,0.003,0.07,0.003c0.027,0,0.054-0.003,0.081-0.003h2.723L354.641,302.05z"></path> <path style={{ fill: "#000003" }} d="M265.392,156.333c1.227,0,2.477-0.213,3.696-0.665l0.873-0.323c5.521-2.05,8.335-8.19,6.286-13.713 c-2.05-5.524-8.192-8.338-13.714-6.287l-0.837,0.31c-5.528,2.042-8.352,8.175-6.311,13.702 C256.977,153.667,261.055,156.333,265.392,156.333z"></path> <path style={{ fill: "#000003" }} d="M266.259,364.329h0.256c5.892,0,10.667-4.776,10.667-10.667s-4.776-10.667-10.667-10.667h-0.256 c-5.889,0-10.667,4.776-10.667,10.667C255.591,359.553,260.369,364.329,266.259,364.329z"></path> </g> </g></svg>
    );
}


function BirthdayPage({ onPageChange }: { onPageChange: (data: number) => void }) {
    const [countBallon, setCountBallon] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bounceControls, setBounceControls] = useState(useAnimation());
    const hasMountedRef = useRef(false);

    const images = [
        "/images/IMG_0595.JPEG",
        "/images/IMG_0227.JPEG",
        "/images/IMG_0653.JPEG",
        "/images/IMG_0687.JPEG",
        "/images/IMG_0565.JPEG",
        "/images/IMG_0745.JPEG",
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        hasMountedRef.current = true;
    }, []);

    const handleClick = () => {
        if (hasMountedRef.current) {
            bounceControls.start({
                scale: [1, 1.2, 0.9, 1.1, 1],
                transition: { duration: 0.6, times: [0, 0.2, 0.4, 0.6, 1] },
            });
        }
        setCountBallon((prev) => {
            return prev + 1;
        });
    };
    return (
        <div className="min-h-screen w-full bg-[#A3D8FF] relative flex flex-col items-center justify-center p-4 text-center">
            <Head>
                <title>Happy Birthday, Cantikk! ❤️</title>
            </Head>
            <Balloon countBallons={countBallon} text='araaaa' />
            <FullscreenConfetti particleCount={30} />
            <motion.div
                className="absolute top-24 -right-2 z-50 w-28"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <TotoroSVG />
            </motion.div>
            <div className="absolute -top-18 -left-18 z-50">
                <SunAnimated />
            </div>
            <div className="relative w-64 h-64 rounded-xl overflow-hidden border-4 border-[#4793AF] z-50">
                <AnimatePresence>
                    <motion.img
                        key={images[currentIndex]}
                        src={images[currentIndex]}
                        alt="Momen spesial"
                        className="absolute w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                    />
                </AnimatePresence>
            </div>
            <motion.div className="absolute bottom-2/12 mt-8 text-xl font-bold text-[#4793AF]"
                onClick={handleClick}
                animate={bounceControls}
            >
                tiup balon satu lagi <br />
                🎈
            </motion.div>
        </div>
    );
}

function SpringGrass() {
    const spring = useSpring({
        from: { offset: 0 },
        to: async (next) => {
            while (true) {
                await next({ offset: 5 });
                await next({ offset: -5 });
            }
        },
        config: { tension: 60, friction: 14 },
    });

    return (
        <div className="absolute bottom-0 left-0 w-full h-28 z-10 overflow-hidden">
            <svg
                viewBox="0 0 800 100"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                {blades.map((blade, i) => (
                    <g key={i}>
                        {[0, -5, 5, 10, 15, 35].map((offsetX, idx) => (
                            <animated.path
                                key={idx}
                                d={spring.offset.to((offset) => {
                                    const ctrlX = blade.x + 5 + offsetX + offset * blade.offsetFactor;
                                    const ctrlY = 100 - blade.height - Math.sin(i + idx) * 50;
                                    const endX = blade.x + 20 + offsetX;
                                    return `M${blade.x + offsetX},100 Q${ctrlX},${ctrlY} ${endX},100`;
                                })}
                                stroke="green"
                                strokeWidth="2"
                                fill="#5F8B4C"
                                strokeLinecap="round"
                            />
                        ))}
                    </g>
                ))}
            </svg>
            <animated.svg
                style={spring}
                viewBox="0 0 600 150"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Rumpun rumput – 1 helai lebar dan melengkung */}
                {Array.from({ length: 10 }).map((_, i) => {
                    const x = i * 20 + Math.random() * 5;
                    const height = 60 + Math.random() * 40;
                    const curve = 20 + Math.random() * 15;
                    const width = 6 + Math.random() * 3;
                    return (
                        <path
                            key={i}
                            d={`
                M ${x},150
                Q ${x + curve},${150 - height} ${x + width},150
                Z
              `}
                            fill="#3aaa35"
                        />
                    );
                })}
            </animated.svg>
        </div>
    );
}

function TotoroSVG() {
    return (
        <img src="/images/totoro-sits-on-tree-branch-dnsbt14o1qxjvcvj.svg" alt="Totoro" />
    );
}

function SunAnimated() {
    return (
        <motion.svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
            <circle cx="90" cy="90" r="30" fill="#FFD93D" />

            {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 8;
                const x1 = 90 + 30 * Math.cos((angle * Math.PI) / 180);
                const y1 = 90 + 30 * Math.sin((angle * Math.PI) / 180);
                const x2 = 90 + 40 * Math.cos((angle * Math.PI) / 180);
                const y2 = 90 + 40 * Math.sin((angle * Math.PI) / 180);

                return (
                    <motion.line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#FFD93D"
                        strokeWidth="4"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            delay: i * 0.2,
                        }}
                    />
                );
            })}
        </motion.svg>
    );
}
