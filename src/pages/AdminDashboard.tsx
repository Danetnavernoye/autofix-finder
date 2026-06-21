import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp, setDoc, where, limit
} from 'firebase/firestore';
import {
  ref, uploadBytes, getDownloadURL
} from 'firebase/storage';
import {
  Package, Store, Users, Calendar, BarChart3, Plus, X, Edit3,
  Trash2, Image as ImageIcon, Save, ChevronRight, Star,
  TrendingUp, DollarSign, ShoppingBag, Settings, Search,
  Upload, AlertCircle, CheckCircle2, Clock, MapPin, Phone,
  Mail, Globe, Palette, ArrowLeft, Zap, Activity, Eye,
  Layers, Tag, Filter, MoreHorizontal, ChevronDown,
  Sparkles, Shield, Award, Truck, Percent, Heart,
  MessageSquare, Bell, LogOut, RefreshCw, Download,
  Share2, Copy, ExternalLink, Minus, Grid3X3, List,
  ArrowUpRight, ArrowDownRight, PieChart, FileText,
  Camera, Hash, Box, CircleDot, Hexagon, Triangle,
  Square, Pentagon, Octagon, Diamond, Crown, Flame,
  Snowflake, Sun, Moon, Cloud, CloudRain, Wind,
  Thermometer, Droplets, Gauge, Wrench, Screwdriver,
  Hammer, Drill, Cog, Cpu, HardDrive, Wifi, Bluetooth,
  Battery, BatteryCharging, BatteryFull, BatteryLow,
  BatteryMedium, Signal, Radio, Antenna, Satellite,
  Rocket, Plane, Car, Bike, Ship, Train, Bus,
  Fuel, Oil, Droplet, SprayCan, Paintbrush, PenTool,
  Eraser, Scissors, Ruler, Compass, Map, Navigation,
  Locate, LocateFixed, LocateOff, MapPinned, Pin,
  PinOff, Paperclip, Link, Unlink, Anchor, AnchorOff,
  Magnet, MagnetOff, Key, Lock, Unlock, EyeOff,
  Fingerprint, Scan, ScanFace, ScanLine, ScanSearch,
  QrCode, Barcode, CreditCard, Wallet, Banknote,
  Coins, PiggyBank, Receipt, ReceiptText, FileInvoice,
  FileCheck, FileX, FilePlus, FileMinus, FileEdit,
  FileSearch, FileLock, FileHeart, FileCog, FileCode,
  FileType, FileVideo, FileAudio, FileImage, FileArchive,
  FileSpreadsheet, FileSliders, FileStack, FileSymlink,
  FileTerminal, FileWarning, FileQuestion, FileBadge,
  FileBox, FileChart, FileClock, FileDigit, FileJson,
  FileKey, FileMusic, FileOutput, FilePen, FilePieChart,
  FilePlay, FilePower, FileScan, FileSearch2, FileSignature,
  FileText2, FileUp, FileUser, FileVolume, FileWarning2,
  FileX2, Files, Folder, FolderOpen, FolderPlus, FolderMinus,
  FolderSearch, FolderSync, FolderTree, FolderX, Folders,
  GalleryHorizontal, GalleryHorizontalEnd, GalleryThumbnails,
  GalleryVertical, GalleryVerticalEnd, ImageMinus, ImageOff,
  ImagePlus, Images, ImagesOff, Import, Inbox, Indent,
  IndentDecrease, IndentIncrease, Index, Infinity, Info,
  Inspect, InspectionPanel, Italic, IterationCcw,
  IterationCw, JapaneseYen, Joystick, Kanban, KeyRound,
  Keyboard, Lamp, LampCeiling, LampDesk, LampFloor, LampWallDown,
  LampWallUp, Landmark, Languages, Laptop, Laptop2, Lasso,
  LassoSelect, Laugh, Layers2, Layout, LayoutDashboard,
  LayoutGrid, LayoutList, LayoutPanelLeft, LayoutPanelTop,
  LayoutTemplate, Leaf, Library, LifeBuoy, Ligature, Lightbulb,
  LightbulbOff, LineChart, Link2, Link2Off, ListChecks,
  ListCollapse, ListEnd, ListFilter, ListMinus, ListMusic,
  ListOrdered, ListPlus, ListRestart, ListStart, ListTodo,
  ListTree, ListVideo, ListX, Loader, Loader2, LocateOff2,
  LockKeyhole, LockKeyholeOpen, LogIn, LogOut2, Luggage,
  Mails, MapPinOff, MapPinned2, Martini, Maximize, Maximize2,
  Medal, Megaphone, MegaphoneOff, Menu, MessageCircle,
  MessageCircleDashed, MessageCircleHeart, MessageCircleMore,
  MessageCircleOff, MessageCirclePlus, MessageCircleQuestion,
  MessageCircleReply, MessageCircleWarning, MessageCircleX,
  MessageSquareDashed, MessageSquareDiff, MessageSquareDot,
  MessageSquareHeart, MessageSquareMore, MessageSquareOff,
  MessageSquarePlus, MessageSquareQuote, MessageSquareReply,
  MessageSquareShare, MessageSquareText, MessageSquareWarning,
  MessageSquareX, MessagesSquare, Mic, Mic2, MicOff, Microscope,
  Microwave, Milestone, Milk, MilkOff, Minimize, Minimize2,
  MinusCircle, MinusSquare, Monitor, MonitorDown, MonitorOff,
  MonitorSmartphone, MonitorSpeaker, MonitorUp, MoonStar,
  MoreHorizontal2, MoreVertical, Mountain, MountainSnow, Mouse,
  MousePointer, MousePointer2, MousePointerClick, Move, Move3d,
  MoveDiagonal, MoveDiagonal2, MoveHorizontal, MoveVertical,
  Music, Music2, Music3, Music4, Navigation2, Navigation2Off,
  NavigationOff, Network, Newspaper, Nfc, Notebook, NotebookPen,
  NotebookTabs, NotepadText, NotepadTextDashed, Nut, NutOff,
  OctagonAlert, OctagonPause, OctagonX, Option, Orbit, Outdent,
  Package2, PackageCheck, PackageMinus, PackageOpen, PackagePlus,
  PackageSearch, PackageX, PaintBucket, Paintbrush2, Palette2,
  Palmtree, PanelBottom, PanelBottomClose, PanelBottomInactive,
  PanelBottomOpen, PanelLeft, PanelLeftClose, PanelLeftInactive,
  PanelLeftOpen, PanelRight, PanelRightClose, PanelRightInactive,
  PanelRightOpen, PanelTop, PanelTopClose, PanelTopInactive,
  PanelTopOpen, PanelsLeftBottom, PanelsRightBottom, PanelsTopLeft,
  Paperclip2, Parentheses, ParkingCircle, ParkingCircleOff,
  ParkingSquare, ParkingSquareOff, PartyPopper, Pause, PauseCircle,
  PauseOctagon, PawPrint, PcCase, PenLine, PenTool2, Pencil,
  PencilLine, PencilRuler, Pentagon2, Percent2, PercentCircle,
  PercentDiamond, PercentSquare, PersonStanding, Phone2,
  PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed,
  PhoneOff, PhoneOutgoing, Pi, PiSquare, PictureInPicture,
  PictureInPicture2, PieChart2, PiggyBank2, Pilcrow, PilcrowLeft,
  PilcrowRight, Pill, Pin2, PinOff2, Pipette, Pizza, Plane2,
  PlaneLanding, PlaneTakeoff, Play, PlayCircle, PlaySquare,
  Plug, Plug2, PlugZap, PlusCircle, PlusSquare, Pocket,
  PocketKnife, Podcast, Pointer, PointerOff, Popcorn, Popsicle,
  PoundSterling, Power, PowerOff, Presentation, Printer,
  Projector, Puzzle, Pyramid, QrCode2, Quote, Rabbit, Radar,
  Radiation, Radio2, RadioReceiver, RadioTower, Radius,
  RailSymbol, Rainbow, Rat, Receipt2, ReceiptCent, ReceiptEuro,
  ReceiptPoundSterling, ReceiptRussianRuble, ReceiptSwissFranc,
  RectangleHorizontal, RectangleVertical, Recycle, Redo,
  Redo2, RedoDot, RefreshCcw, RefreshCcwDot, RefreshCw2,
  RefreshCwOff, Refrigerator, Regex, RemoveFormatting,
  Repeat, Repeat1, Repeat2, Replace, ReplaceAll, Reply,
  ReplyAll, Rewind, Rocket2, RockingChair, RollerCoaster,
  Rotate3d, RotateCcw, RotateCcwSquare, RotateCw, RotateCwSquare,
  Route, RouteOff, Router, Rows2, Rows3, Rows4, Rss, Ruler2,
  RussianRuble, Sailboat, Salad, Sandwich, Satellite2, SatelliteDish,
  Save2, SaveAll, Scale, Scale3d, Scaling, ScanBarcode,
  ScanEye, ScanFace2, ScanLine2, ScanSearch2, School, Scissors2,
  ScreenShare, ScreenShareOff, Scroll, ScrollText, Search2,
  SearchCheck, SearchCode, SearchSlash, SearchX, Send,
  SendHorizontal, SendToBack, SeparatorHorizontal,
  SeparatorVertical, Server, ServerCog, ServerCrash, ServerOff,
  Settings2, Shapes, Share, Sheet, Shell, Shield2, ShieldAlert,
  ShieldBan, ShieldCheck, ShieldEllipsis, ShieldHalf, ShieldMinus,
  ShieldOff, ShieldPlus, ShieldQuestion, ShieldX, Ship2, ShipWheel,
  Shirt, ShoppingBag2, ShoppingBasket, ShoppingCart, Shovel,
  ShowerHead, Shrink, Shrub, Shuffle, Sidebar, SidebarClose,
  SidebarOpen, Sigma, Signal2, SignalHigh, SignalLow, SignalMedium,
  SignalZero, Signpost, SignpostBig, Siren, SkipBack, SkipForward,
  Skull, Slack, Slash, Slice, SlidersHorizontal, SlidersVertical,
  Smartphone, SmartphoneCharging, SmartphoneNfc, Smile,
  SmilePlus, Snail, Snowflake2, Sofa, Soup, Space, Spade,
  Sparkle, Sparkles2, Speaker, Speech, SpellCheck, SpellCheck2,
  Spline, Split, SprayCan2, Sprout, Square2, SquareActivity,
  SquareArrowDown, SquareArrowDownLeft, SquareArrowDownRight,
  SquareArrowLeft, SquareArrowOutDownLeft, SquareArrowOutDownRight,
  SquareArrowOutUpLeft, SquareArrowOutUpRight, SquareArrowRight,
  SquareArrowUp, SquareArrowUpLeft, SquareArrowUpRight, SquareAsterisk,
  SquareBottomDashedScissors, SquareCheck, SquareCheckBig,
  SquareChevronDown, SquareChevronLeft, SquareChevronRight,
  SquareChevronUp, SquareCode, SquareDashedBottom, SquareDashedBottomCode,
  SquareDashedKanban, SquareDashedMousePointer, SquareDivide,
  SquareDot, SquareEqual, SquareFunction, SquareGanttChart,
  SquareKanban, SquareLibrary, SquareM, SquareMenu, SquareMinus,
  SquareMousePointer, SquareParking, SquareParkingOff, SquarePen,
  SquarePercent, SquarePi, SquarePilcrow, SquarePlay, SquarePlus,
  SquarePower, SquareRadical, SquareScissors, SquareSigma,
  SquareSlash, SquareSplitHorizontal, SquareSplitVertical,
  SquareStack, SquareTerminal, SquareUser, SquareUserRound,
  SquareX, Squircle, Squirrel, Stamp, Star2, StarHalf,
  StarOff, StepBack, StepForward, Stethoscope, Sticker,
  StickyNote, StopCircle, Store2, StretchHorizontal, StretchVertical,
  Strikethrough, Subscript, Subtitles, Sun2, SunDim, SunMedium,
  SunMoon, Sunrise, Sunset, Superscript, SwissFranc, SwitchCamera,
  Sword, Swords, Syringe, Table, Table2, TableCellsMerge,
  TableCellsSplit, TableProperties, Tablet, TabletSmartphone,
  Tablets, Tag2, Tags, Target, Tent, TentTree, Terminal,
  TerminalSquare, TestTube, TestTube2, TestTubes, Text,
  TextCursor, TextCursorInput, TextQuote, TextSearch, TextSelect,
  Theater, Thermometer2, ThermometerSnowflake, ThermometerSun,
  ThumbsDown, ThumbsUp, Ticket, TicketCheck, TicketMinus,
  TicketPercent, TicketPlus, TicketSlash, TicketX, Timer,
  TimerOff, TimerReset, ToggleLeft, ToggleRight, Tornado,
  Touchpad, TouchpadOff, TowerControl, ToyBrick, Tractor,
  TrafficCone, TrainFront, TrainFrontTunnel, TrainTrack,
  TramFront, Trash, TreeDeciduous, TreePine, Trees, Trello,
  TrendingDown2, TrendingUp2, Triangle2, TriangleAlert,
  TriangleRight, Trophy, Truck2, Tshirt, Tv, Tv2, Twitch,
  Type, Umbrella, UmbrellaOff, Underline, Undo,
  Undo2, UndoDot, UnfoldHorizontal, UnfoldVertical, Ungroup,
  University, Unlink2, Unlock2, Upload2, Usb, User, User2,
  UserCheck, UserCheck2, UserCircle, UserCircle2, UserCog,
  UserCog2, UserMinus, UserMinus2, UserPlus, UserPlus2,
  UserRound, UserRoundCheck, UserRoundCog, UserRoundMinus,
  UserRoundPlus, UserRoundSearch, UserRoundX, UserSearch,
  UserX, UserX2, Users2, UsersRound, Utensils, UtensilsCrossed,
  UtilityPole, Variable, Vault, Vegan, VenetianMask, Vibrate,
  VibrateOff, Video, Video2, VideoOff, Videotape, View,
  Voicemail, Volume, Volume1, Volume2, VolumeX, Vote,
  Wallet2, WalletCards, Wallpaper, Wand, Wand2, Warehouse,
  Watch, Waves, Waypoints, Webcam, Webhook, Weight, Wheat,
  WheatOff, WholeWord, Wifi2, WifiOff, Wind2, Wine, WineOff,
  Workflow, Worm, WrapText, Wrench2, X2, XCircle, XOctagon,
  XSquare, ZapOff, ZoomIn, ZoomOut
} from 'lucide-react';
import { db, storage } from '../lib/firebase';

// ═══════════════════════════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  badge?: string;
  stockStatus: 'IN_STOCK' | 'FEW_LEFT' | 'OUT_OF_STOCK';
  description: string;
  category: string;
  sku?: string;
  weight?: number;
  dimensions?: string;
  tags?: string[];
  createdAt?: any;
  updatedAt?: any;
}

interface ShopInfo {
  id: string;
  shopName: string;
  tagline: string;
  accentColor: string;
  secondaryColor: string;
  logoUrl: string;
  bannerUrl?: string;
  primaryCategory: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  businessHours: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  currency: string;
  taxRate: number;
  shippingFee: number;
  freeShippingThreshold: number;
  updatedAt?: any;
}

interface User {
  id: string;
  displayName?: string;
  email?: string;
  role?: string;
  avatarUrl?: string;
  phone?: string;
  address?: string;
  status?: 'active' | 'inactive' | 'banned';
  lastLogin?: any;
  createdAt?: any;
}

interface Appointment {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  shopId?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  serviceType?: string;
  notes?: string;
  scheduledAt?: any;
  completedAt?: any;
  createdAt?: any;
}

interface Order {
  id: string;
  userId: string;
  userName?: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod?: string;
  shippingAddress?: string;
  createdAt?: any;
  updatedAt?: any;
}

interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalAppointments: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  weeklyRevenue: number;
  dailyRevenue: number;
  lowStockCount: number;
  outOfStockCount: number;
  pendingOrders: number;
  pendingAppointments: number;
  conversionRate: number;
  avgOrderValue: number;
  topCategory: string;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'appointment' | 'user' | 'system' | 'alert';
  read: boolean;
  createdAt: any;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  3D & ANIMATION UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

const use3DCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPosition({ x: 50, y: 50 });
    setIsHovered(false);
  }, []);

  return { cardRef, transform, glowPosition, isHovered, setIsHovered, handleMouseMove, handleMouseLeave };
};

const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = scrolled * speed;
      setOffset(rate);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};

const useCountUp = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(start + (end - start) * easeOutQuart));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration, start]);

  return { count, ref };
};

// ═══════════════════════════════════════════════════════════════════════════════
//  PARTICLE SYSTEM COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const ParticleField: React.FC<{ color?: string; density?: number }> = ({
  color = 'rgba(59,130,246,0.4)',
  density = 50
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; opacity: number; life: number; maxLife: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particlesRef.current = Array.from({ length: density }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      life: 0,
      maxLife: Math.random() * 200 + 100,
    }));

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife || p.x < 0 || p.x > canvas.offsetWidth || p.y < 0 || p.y > canvas.offsetHeight) {
          particlesRef.current[i] = {
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            life: 0,
            maxLife: Math.random() * 200 + 100,
          };
        }

        const lifeRatio = 1 - Math.abs((p.life / p.maxLife) - 0.5) * 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color.replace('0.4', String(p.opacity * lifeRatio));
        ctx.fill();
      });

      // Draw connections
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = color.replace('0.4', String(0.1 * (1 - dist / 100)));
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [color, density]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  3D CARD COMPONENT WITH ADVANCED EFFECTS
// ═══════════════════════════════════════════════════════════════════════════════

const Card3D: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glowColor?: string;
  depth?: number;
  borderGlow?: boolean;
  tiltIntensity?: number;
}> = ({
  children,
  className = '',
  onClick,
  glowColor = 'rgba(59,130,246,0.3)',
  depth = 30,
  borderGlow = true,
  tiltIntensity = 12
}) => {
  const { cardRef, transform, glowPosition, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = use3DCard();

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-300 ease-out ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 0.2 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 60%)`,
          transform: `translateZ(-${depth}px)`,
          filter: 'blur(20px)',
        }}
      />
      {/* Border glow */}
      {borderGlow && (
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: isHovered ? 0.5 : 0,
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 40%)`,
            transform: `translateZ(-${depth / 2}px)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
      {/* Content layer */}
      <div className="relative h-full" style={{ transform: `translateZ(${depth / 2}px)` }}>
        {children}
      </div>
      {/* Reflection layer */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 0.05 : 0,
          background: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)`,
          transform: `translateZ(${depth}px)`,
        }}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  FLOATING ELEMENT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const FloatingElement: React.FC<{
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}> = ({ children, className = '', amplitude = 10, duration = 3, delay = 0 }) => {
  return (
    <div
      className={`${className}`}
      style={{
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        '--float-amplitude': `${amplitude}px`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  GLITCH TEXT EFFECT
// ═══════════════════════════════════════════════════════════════════════════════

const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={isGlitching ? 'opacity-0' : 'opacity-100'}>{text}</span>
      {isGlitching && (
        <>
          <span className="absolute inset-0 text-red-400" style={{ clipPath: 'inset(20% 0 60% 0)', transform: 'translateX(-2px)' }}>
            {text}
          </span>
          <span className="absolute inset-0 text-cyan-400" style={{ clipPath: 'inset(60% 0 20% 0)', transform: 'translateX(2px)' }}>
            {text}
          </span>
        </>
      )}
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  MODAL WITH 3D ENTRANCE
// ═══════════════════════════════════════════════════════════════════════════════

const Modal3D: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  icon?: React.ReactNode;
}> = ({ isOpen, onClose, title, children, maxWidth = 'max-w-4xl', icon }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 400);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-xl transition-all duration-500 ${
          isVisible && !isClosing ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      <div
        className={`relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-white/10 rounded-3xl shadow-2xl transition-all duration-500 ${
          isVisible && !isClosing
            ? 'opacity-100 scale-100 translate-y-0 rotate-0'
            : 'opacity-0 scale-90 -translate-y-12 rotate-x-12'
        }`}
        style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-gradient-to-r from-slate-900/95 via-slate-950/95 to-slate-900/95 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-3">
            {icon && <div className="p-2 rounded-xl bg-white/5">{icon}</div>}
            <h2 className="text-2xl font-black text-white tracking-tight">
              <GlitchText text={title} />
            </h2>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-white/10 transition-all hover:rotate-90 duration-300">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════════════════════════

const AnimatedCounter: React.FC<{
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}> = ({ value, prefix = '', suffix = '', className = '' }) => {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  PULSE BADGE
// ═══════════════════════════════════════════════════════════════════════════════

const PulseBadge: React.FC<{
  children: React.ReactNode;
  color?: string;
  className?: string;
}> = ({ children, color = '#10B981', className = '' }) => {
  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: color }} />
      <span className="relative inline-flex items-center px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}>
        {children}
      </span>
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  PRODUCT FORM
// ═══════════════════════════════════════════════════════════════════════════════

const ProductForm: React.FC<{
  product?: Product;
  onSave: (product: Partial<Product>, imageFile?: File) => void;
  onCancel: () => void;
}> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: product?.name || '',
    brand: product?.brand || '',
    price: product?.price || 0,
    originalPrice: product?.originalPrice,
    rating: product?.rating || 5,
    reviewCount: product?.reviewCount || 0,
    badge: product?.badge || '',
    stockStatus: product?.stockStatus || 'IN_STOCK',
    description: product?.description || '',
    category: product?.category || '',
    sku: product?.sku || '',
    weight: product?.weight || 0,
    dimensions: product?.dimensions || '',
    tags: product?.tags || [],
    imageUrl: product?.imageUrl || '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(product?.imageUrl || '');
  const [tagInput, setTagInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setImageFile(file); setPreviewUrl(URL.createObjectURL(file)); }
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) { setImageFile(file); setPreviewUrl(URL.createObjectURL(file)); }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags?.filter(t => t !== tag) || [] });
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData, imageFile || undefined); };

  const categories = [
    'Carrying & Towing', 'Exterior', 'Interior', 'Wheels & Accessories',
    'Engine & Performance', 'Electronics', 'Brakes & Suspension', 'Lighting',
    'Filters & Fluids', 'Tools & Equipment', 'Safety & Security'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center">
        <div
          className={`relative w-56 h-56 rounded-2xl border-2 border-dashed transition-all duration-300 flex items-center justify-center cursor-pointer overflow-hidden group ${
            isDragging ? 'border-blue-500 bg-blue-500/10 scale-105' : 'border-white/20 bg-white/5 hover:border-white/40'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                <ImageIcon className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-sm text-slate-400 font-medium">Drop image here</p>
              <p className="text-xs text-slate-600 mt-1">or click to browse</p>
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            <div className="text-center">
              <Upload className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-xs text-white/80">Change Image</p>
            </div>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Tag className="w-3.5 h-3.5" /> Product Name</label>
          <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            placeholder="e.g. Heavy-Duty Hitch Receiver" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Award className="w-3.5 h-3.5" /> Brand</label>
          <input type="text" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            placeholder="e.g. CURT" required />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><DollarSign className="w-3.5 h-3.5" /> Price (PHP)</label>
          <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Percent className="w-3.5 h-3.5" /> Original Price</label>
          <input type="number" step="0.01" value={formData.originalPrice || ''} onChange={e => setFormData({ ...formData, originalPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Optional" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Layers className="w-3.5 h-3.5" /> Category</label>
          <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" required>
            <option value="" className="bg-slate-900">Select category</option>
            {categories.map(cat => <option key={cat} value={cat} className="bg-slate-900">{cat}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Star className="w-3.5 h-3.5" /> Rating (0-5)</label>
          <input type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={e => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5" /> Review Count</label>
          <input type="number" value={formData.reviewCount} onChange={e => setFormData({ ...formData, reviewCount: parseInt(e.target.value) })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Box className="w-3.5 h-3.5" /> Stock Status</label>
          <select value={formData.stockStatus} onChange={e => setFormData({ ...formData, stockStatus: e.target.value as any })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all">
            <option value="IN_STOCK" className="bg-slate-900">✓ In Stock</option>
            <option value="FEW_LEFT" className="bg-slate-900">⚠ Few Left</option>
            <option value="OUT_OF_STOCK" className="bg-slate-900">✗ Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Hash className="w-3.5 h-3.5" /> SKU</label>
          <input type="text" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="e.g. SKU-001" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Weight className="w-3.5 h-3.5" /> Weight (kg)</label>
          <input type="number" step="0.01" value={formData.weight} onChange={e => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Ruler className="w-3.5 h-3.5" /> Dimensions</label>
          <input type="text" value={formData.dimensions} onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="e.g. 10x5x3 cm" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Sparkles className="w-3.5 h-3.5" /> Badge (Optional)</label>
        <input type="text" value={formData.badge || ''} onChange={e => setFormData({ ...formData, badge: e.target.value || undefined })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="e.g. BESTSELLER, NEW, SALE, LIMITED" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Tags className="w-3.5 h-3.5" /> Tags</label>
        <div className="flex gap-2 flex-wrap">
          {formData.tags?.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/30">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-blue-300"><X className="w-3 h-3" /></button>
            </span>
          ))}
          <div className="flex gap-2">
            <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500/50 w-32" placeholder="Add tag..." />
            <button type="button" onClick={addTag} className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all text-sm"><Plus className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Description</label>
        <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
          placeholder="Detailed product description..." required />
      </div>

      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-slate-400 font-semibold hover:bg-white/5 hover:text-white transition-all">Cancel</button>
        <button type="submit" className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Save className="w-4 h-4 inline mr-2" />{product ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  SHOP INFO FORM
// ═══════════════════════════════════════════════════════════════════════════════

const ShopInfoForm: React.FC<{
  shopInfo: ShopInfo | null;
  onSave: (info: Partial<ShopInfo>, logoFile?: File, bannerFile?: File) => void;
}> = ({ shopInfo, onSave }) => {
  const [formData, setFormData] = useState<Partial<ShopInfo>>({
    shopName: shopInfo?.shopName || 'AutoFix Marketplace',
    tagline: shopInfo?.tagline || 'Premium Auto Parts & Accessories',
    accentColor: shopInfo?.accentColor || '#3B82F6',
    secondaryColor: shopInfo?.secondaryColor || '#8B5CF6',
    primaryCategory: shopInfo?.primaryCategory || 'Automotive',
    contactPhone: shopInfo?.contactPhone || '',
    contactEmail: shopInfo?.contactEmail || '',
    address: shopInfo?.address || '',
    businessHours: shopInfo?.businessHours || 'Mon-Sat: 8AM - 6PM',
    facebookUrl: shopInfo?.facebookUrl || '',
    instagramUrl: shopInfo?.instagramUrl || '',
    twitterUrl: shopInfo?.twitterUrl || '',
    youtubeUrl: shopInfo?.youtubeUrl || '',
    currency: shopInfo?.currency || 'PHP',
    taxRate: shopInfo?.taxRate || 0,
    shippingFee: shopInfo?.shippingFee || 0,
    freeShippingThreshold: shopInfo?.freeShippingThreshold || 0,
    logoUrl: shopInfo?.logoUrl || '',
    bannerUrl: shopInfo?.bannerUrl || '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState(shopInfo?.logoUrl || '');
  const [bannerPreview, setBannerPreview] = useState(shopInfo?.bannerUrl || '');
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setLogoFile(file); setLogoPreview(URL.createObjectURL(file)); }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setBannerFile(file); setBannerPreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData, logoFile || undefined, bannerFile || undefined); };

  const colorPresets = [
    { name: 'Ocean', primary: '#3B82F6', secondary: '#06B6D4' },
    { name: 'Emerald', primary: '#10B981', secondary: '#14B8A6' },
    { name: 'Amber', primary: '#F59E0B', secondary: '#F97316' },
    { name: 'Rose', primary: '#EF4444', secondary: '#EC4899' },
    { name: 'Violet', primary: '#8B5CF6', secondary: '#A855F7' },
    { name: 'Slate', primary: '#64748B', secondary: '#94A3B8' },
    { name: 'Teal', primary: '#14B8A6', secondary: '#2DD4BF' },
    { name: 'Crimson', primary: '#DC2626', secondary: '#EF4444' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-slate-400 mb-3 block">Shop Logo</label>
          <div className="relative w-full aspect-square max-w-[160px] rounded-2xl border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center cursor-pointer hover:border-white/40 transition-all overflow-hidden group"
            onClick={() => logoInputRef.current?.click()}>
            {logoPreview ? (
              <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center"><Store className="w-10 h-10 text-slate-500 mx-auto" /><p className="text-xs text-slate-500 mt-2">Upload Logo</p></div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-400 mb-3 block">Banner Image</label>
          <div className="relative w-full aspect-video rounded-2xl border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center cursor-pointer hover:border-white/40 transition-all overflow-hidden group"
            onClick={() => bannerInputRef.current?.click()}>
            {bannerPreview ? (
              <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center"><ImageIcon className="w-10 h-10 text-slate-500 mx-auto" /><p className="text-xs text-slate-500 mt-2">Upload Banner</p></div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400">Shop Name</label>
          <input type="text" value={formData.shopName} onChange={e => setFormData({ ...formData, shopName: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400">Tagline</label>
          <input type="text" value={formData.tagline} onChange={e => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-400">Color Theme</label>
        <div className="grid grid-cols-4 gap-3">
          {colorPresets.map(theme => (
            <button key={theme.name} type="button"
              onClick={() => setFormData({ ...formData, accentColor: theme.primary, secondaryColor: theme.secondary })}
              className={`p-3 rounded-xl border transition-all ${formData.accentColor === theme.primary ? 'border-white/40 bg-white/10 scale-105' : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'}`}>
              <div className="flex gap-2 justify-center mb-2">
                <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: theme.primary }} />
                <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: theme.secondary }} />
              </div>
              <p className="text-xs text-slate-400 font-medium">{theme.name}</p>
            </button>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <input type="color" value={formData.accentColor} onChange={e => setFormData({ ...formData, accentColor: e.target.value })}
              className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border border-white/10" />
            <span className="text-xs text-slate-500">Primary</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="color" value={formData.secondaryColor} onChange={e => setFormData({ ...formData, secondaryColor: e.target.value })}
              className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border border-white/10" />
            <span className="text-xs text-slate-500">Secondary</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400">Primary Category</label>
          <input type="text" value={formData.primaryCategory} onChange={e => setFormData({ ...formData, primaryCategory: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400">Business Hours</label>
          <input type="text" value={formData.businessHours} onChange={e => setFormData({ ...formData, businessHours: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Contact Phone</label>
          <input type="tel" value={formData.contactPhone} onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Contact Email</label>
          <input type="email" value={formData.contactEmail} onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Address</label>
        <input type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> Facebook URL</label>
          <input type="url" value={formData.facebookUrl} onChange={e => setFormData({ ...formData, facebookUrl: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Camera className="w-3.5 h-3.5" /> Instagram URL</label>
          <input type="url" value={formData.instagramUrl} onChange={e => setFormData({ ...formData, instagramUrl: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400">Twitter URL</label>
          <input type="url" value={formData.twitterUrl} onChange={e => setFormData({ ...formData, twitterUrl: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400">YouTube URL</label>
          <input type="url" value={formData.youtubeUrl} onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400">Currency</label>
          <input type="text" value={formData.currency} onChange={e => setFormData({ ...formData, currency: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400">Tax Rate (%)</label>
          <input type="number" step="0.01" value={formData.taxRate} onChange={e => setFormData({ ...formData, taxRate: parseFloat(e.target.value) })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400">Shipping Fee</label>
          <input type="number" step="0.01" value={formData.shippingFee} onChange={e => setFormData({ ...formData, shippingFee: parseFloat(e.target.value) })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-400">Free Shipping Threshold</label>
          <input type="number" step="0.01" value={formData.freeShippingThreshold} onChange={e => setFormData({ ...formData, freeShippingThreshold: parseFloat(e.target.value) })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all" />
        </div>
      </div>

      <div className="pt-4">
        <button type="submit" className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Save className="w-4 h-4 inline mr-2" />Save Shop Information
        </button>
      </div>
    </form>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  PRODUCTS MANAGEMENT SCREEN
// ═══════════════════════════════════════════════════════════════════════════════

const ProductsScreen: React.FC<{
  products: Product[];
  onAdd: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
}> = ({ products, onAdd, onEdit, onDelete, searchQuery }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'stock'>('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState<'all' | 'in_stock' | 'few_left' | 'out_of_stock'>('all');

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const filtered = useMemo(() => {
    let result = products.filter(p =>
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
       p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (filterCategory !== 'all') {
      result = result.filter(p => p.category === filterCategory);
    }

    if (filterStock !== 'all') {
      result = result.filter(p => p.stockStatus === filterStock.toUpperCase().replace('_', '_'));
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'stock': return a.stockStatus.localeCompare(b.stockStatus);
        default: return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [products, searchQuery, filterCategory, filterStock, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Products</h3>
          <p className="text-sm text-slate-400 mt-1">{filtered.length} products in inventory</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50">
            <option value="name" className="bg-slate-900">Sort by Name</option>
            <option value="price" className="bg-slate-900">Sort by Price</option>
            <option value="rating" className="bg-slate-900">Sort by Rating</option>
            <option value="stock" className="bg-slate-900">Sort by Stock</option>
          </select>
          <button onClick={onAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Plus className="w-4 h-4" />Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50">
          {categories.map(cat => (
            <option key={cat} value={cat} className="bg-slate-900">
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
        <select value={filterStock} onChange={e => setFilterStock(e.target.value as any)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50">
          <option value="all" className="bg-slate-900">All Stock</option>
          <option value="in_stock" className="bg-slate-900">In Stock</option>
          <option value="few_left" className="bg-slate-900">Few Left</option>
          <option value="out_of_stock" className="bg-slate-900">Out of Stock</option>
        </select>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <FloatingElement key={product.id} delay={i * 0.05} amplitude={5} duration={3 + Math.random()}>
              <Card3D glowColor="rgba(59,130,246,0.2)" depth={20}>
                <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-white/10 overflow-hidden group hover:border-white/20 transition-all">
                  <div className="relative aspect-square bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center overflow-hidden">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <Package className="w-16 h-16 text-slate-600" />
                    )}
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md text-white border border-white/20">
                        {product.badge}
                      </span>
                    )}
                    {product.stockStatus === 'FEW_LEFT' && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 backdrop-blur-md text-amber-400 border border-amber-500/30">FEW LEFT</span>
                    )}
                    {product.stockStatus === 'OUT_OF_STOCK' && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 backdrop-blur-md text-red-400 border border-red-500/30">OUT OF STOCK</span>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                      <button onClick={(e) => { e.stopPropagation(); onEdit(product); }} className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all hover:scale-110">
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); onDelete(product.id); }} className="p-3 rounded-full bg-red-500/20 backdrop-blur-md text-red-400 hover:bg-red-500/30 transition-all hover:scale-110">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{product.brand}</p>
                      {product.sku && <p className="text-[10px] text-slate-600 font-mono">{product.sku}</p>}
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1 line-clamp-1">{product.name}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-slate-400">{product.rating} ({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="text-lg font-bold text-white">PHP {product.price.toLocaleString()}</span>
                        {product.originalPrice && <span className="text-xs text-slate-500 line-through ml-2">PHP {product.originalPrice.toLocaleString()}</span>}
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                        product.stockStatus === 'IN_STOCK' ? 'bg-emerald-500/10 text-emerald-400' :
                        product.stockStatus === 'FEW_LEFT' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {product.stockStatus === 'IN_STOCK' ? 'In Stock' : product.stockStatus === 'FEW_LEFT' ? 'Few Left' : 'Out'}
                      </span>
                    </div>
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {product.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-500 border border-white/5">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card3D>
            </FloatingElement>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(product => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center overflow-hidden shrink-0">
                          {product.imageUrl ? <img src={product.imageUrl} alt="" className="w-full h-full object-cover" /> : <Package className="w-5 h-5 text-slate-600" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{product.name}</p>
                          <p className="text-xs text-slate-500">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{product.category}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-white">PHP {product.price.toLocaleString()}</span>
                      {product.originalPrice && <span className="text-xs text-slate-500 line-through ml-2">PHP {product.originalPrice.toLocaleString()}</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                        product.stockStatus === 'IN_STOCK' ? 'bg-emerald-500/10 text-emerald-400' :
                        product.stockStatus === 'FEW_LEFT' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {product.stockStatus === 'IN_STOCK' ? 'In Stock' : product.stockStatus === 'FEW_LEFT' ? 'Few Left' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm text-white">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(product)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDelete(product.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <FloatingElement amplitude={8} duration={4}>
            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          </FloatingElement>
          <p className="text-slate-500 text-lg font-medium">No products found</p>
          <p className="text-slate-600 text-sm mt-1">Try adjusting your filters or add a new product</p>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  USERS MANAGEMENT SCREEN
// ═══════════════════════════════════════════════════════════════════════════════

const UsersScreen: React.FC<{ users: User[]; searchQuery: string }> = ({ users, searchQuery }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'banned'>('all');

  const filtered = users.filter(u => {
    const matchesSearch = (u.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Users</h3>
          <p className="text-sm text-slate-400 mt-1">{filtered.length} registered users</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'inactive', 'banned'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((user, i) => (
          <FloatingElement key={user.id} delay={i * 0.05} amplitude={4} duration={3 + Math.random()}>
            <Card3D glowColor="rgba(139,92,246,0.2)" depth={15}>
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-white/10 p-5 hover:border-white/20 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-6 h-6 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{user.displayName || 'Unknown'}</p>
                      <p className="text-xs text-slate-500">{user.email || 'N/A'}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    user.role === 'superadmin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    user.role === 'admin' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                  }`}>
                    {user.role || 'user'}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Status</span>
                    <span className={`font-medium ${
                      user.status === 'active' ? 'text-emerald-400' :
                      user.status === 'inactive' ? 'text-amber-400' :
                      'text-red-400'
                    }`}>
                      {user.status || 'active'}
                    </span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone className="w-3 h-3" />{user.phone}
                    </div>
                  )}
                  {user.lastLogin && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />Last login: {user.lastLogin?.toDate?.() ? user.lastLogin.toDate().toLocaleDateString() : 'N/A'}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />Joined: {user.createdAt?.toDate?.() ? user.createdAt.toDate().toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              </div>
            </Card3D>
          </FloatingElement>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  APPOINTMENTS SCREEN
// ═══════════════════════════════════════════════════════════════════════════════

const AppointmentsScreen: React.FC<{ appointments: Appointment[]; searchQuery: string }> = ({ appointments, searchQuery }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

  const filtered = appointments.filter(apt => {
    const matchesSearch = (apt.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.serviceType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusConfig = {
    pending: { color: '#F59E0B', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', icon: Clock },
    confirmed: { color: '#3B82F6', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', icon: CheckCircle2 },
    completed: { color: '#10B981', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: CheckCircle2 },
    cancelled: { color: '#EF4444', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', icon: XCircle },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Appointments</h3>
          <p className="text-sm text-slate-400 mt-1">{filtered.length} total appointments</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((apt, i) => {
          const config = statusConfig[apt.status] || statusConfig.pending;
          const StatusIcon = config.icon;
          return (
            <FloatingElement key={apt.id} delay={i * 0.05} amplitude={4} duration={3 + Math.random()}>
              <Card3D glowColor={`${config.color}33`} depth={15}>
                <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-white/10 p-5 hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${config.color}15` }}>
                        <StatusIcon className="w-6 h-6" style={{ color: config.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Appointment #{apt.id.slice(-6)}</p>
                        <p className="text-xs text-slate-400">{apt.userName || `User: ${apt.userId.slice(-8)}`}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${config.bg} ${config.text} border ${config.border}`}>
                      {apt.status}
                    </span>
                  </div>
                  {apt.serviceType && (
                    <div className="mt-3 flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs text-slate-400">{apt.serviceType}</span>
                    </div>
                  )}
                  {apt.notes && (
                    <div className="mt-2 text-xs text-slate-500 line-clamp-2">{apt.notes}</div>
                  )}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {apt.scheduledAt?.toDate?.() ? apt.scheduledAt.toDate().toLocaleString() : 'Not scheduled'}
                    </div>
                    {apt.completedAt && (
                      <div className="text-xs text-slate-600">
                        Completed: {apt.completedAt.toDate?.() ? apt.completedAt.toDate().toLocaleDateString() : 'N/A'}
                      </div>
                    )}
                  </div>
                </div>
              </Card3D>
            </FloatingElement>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  ANALYTICS SCREEN WITH CHARTS
// ═══════════════════════════════════════════════════════════════════════════════

const AnalyticsScreen: React.FC<{ stats: DashboardStats; products: Product[] }> = ({ stats, products }) => {
  const topProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const lowStockProducts = products.filter(p => p.stockStatus === 'FEW_LEFT' || p.stockStatus === 'OUT_OF_STOCK');

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [products]);

  const revenueTrend = [
    { day: 'Mon', value: stats.dailyRevenue * 0.8 },
    { day: 'Tue', value: stats.dailyRevenue * 1.2 },
    { day: 'Wed', value: stats.dailyRevenue * 0.9 },
    { day: 'Thu', value: stats.dailyRevenue * 1.5 },
    { day: 'Fri', value: stats.dailyRevenue * 1.8 },
    { day: 'Sat', value: stats.dailyRevenue * 2.1 },
    { day: 'Sun', value: stats.dailyRevenue * 1.3 },
  ];

  const maxRevenue = Math.max(...revenueTrend.map(r => r.value), 1);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-black text-white tracking-tight">Analytics</h3>
        <p className="text-sm text-slate-400 mt-1">Platform performance overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: stats.totalRevenue, prefix: 'PHP ', icon: DollarSign, color: '#10B981' },
          { label: 'Monthly Revenue', value: stats.monthlyRevenue, prefix: 'PHP ', icon: TrendingUp, color: '#3B82F6' },
          { label: 'Weekly Revenue', value: stats.weeklyRevenue, prefix: 'PHP ', icon: BarChart3, color: '#8B5CF6' },
          { label: 'Daily Revenue', value: stats.dailyRevenue, prefix: 'PHP ', icon: Activity, color: '#F59E0B' },
        ].map((stat, i) => (
          <FloatingElement key={stat.label} delay={i * 0.1} amplitude={3} duration={3}>
            <Card3D glowColor={`${stat.color}30`} depth={10}>
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-white/10 p-5 hover:border-white/20 transition-all">
                <stat.icon className="w-6 h-6 mb-3" style={{ color: stat.color }} />
                <p className="text-2xl font-black text-white tracking-tight">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} />
                </p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            </Card3D>
          </FloatingElement>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card3D glowColor="rgba(59,130,246,0.15)" depth={10}>
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-bold text-white">Revenue Trend</h4>
                <p className="text-xs text-slate-400">Last 7 days performance</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5%</span>
              </div>
            </div>
            <div className="flex items-end gap-3 h-48">
              {revenueTrend.map((item, i) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-blue-500/20 to-blue-500/60 transition-all duration-500 hover:from-blue-400/30 hover:to-blue-400/70"
                      style={{ height: `${(item.value / maxRevenue) * 160}px` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </Card3D>

        {/* Category Distribution */}
        <Card3D glowColor="rgba(139,92,246,0.15)" depth={10}>
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-bold text-white">Categories</h4>
                <p className="text-xs text-slate-400">Product distribution</p>
              </div>
            </div>
            <div className="space-y-4">
              {categoryData.map(([category, count], i) => {
                const total = products.length || 1;
                const percentage = (count / total) * 100;
                const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];
                return (
                  <div key={category} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{category}</span>
                      <span className="text-white font-medium">{count} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: colors[i % colors.length],
                          boxShadow: `0 0 10px ${colors[i % colors.length]}40`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card3D>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Rated Products */}
        <Card3D glowColor="rgba(245,158,11,0.15)" depth={10}>
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-white/10 p-6">
            <h4 className="text-lg font-bold text-white mb-4">Top Rated Products</h4>
            <div className="space-y-3">
              {topProducts.map((product, i) => (
                <div key={product.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group cursor-pointer">
                  <span className="text-lg font-black text-slate-600 w-8">#{i + 1}</span>
                  <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden shrink-0">
                    {product.imageUrl ? <img src={product.imageUrl} alt="" className="w-full h-full object-cover" /> : <Package className="w-6 h-6 text-slate-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{product.name}</p>
                    <p className="text-xs text-slate-400">{product.brand}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold text-white">{product.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card3D>

        {/* Low Stock Alert */}
        <Card3D glowColor="rgba(239,68,68,0.15)" depth={10}>
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">Low Stock Alert</h4>
              <PulseBadge color="#EF4444">{lowStockProducts.length} items</PulseBadge>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
              {lowStockProducts.map(product => (
                <div key={product.id} className="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden shrink-0">
                    {product.imageUrl ? <img src={product.imageUrl} alt="" className="w-full h-full object-cover" /> : <Package className="w-5 h-5 text-slate-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.brand}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    product.stockStatus === 'FEW_LEFT' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {product.stockStatus === 'FEW_LEFT' ? 'FEW LEFT' : 'OUT'}
                  </span>
                </div>
              ))}
              {lowStockProducts.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500/50 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">All items well stocked!</p>
                </div>
              )}
            </div>
          </div>
        </Card3D>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  ORDERS SCREEN
// ═══════════════════════════════════════════════════════════════════════════════

const OrdersScreen: React.FC<{ orders: Order[]; searchQuery: string }> = ({ orders, searchQuery }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all');

  const filtered = orders.filter(o => {
    const matchesSearch = (o.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusConfig = {
    pending: { color: '#F59E0B', bg: 'bg-amber-500/10', text: 'text-amber-400', icon: Clock },
    processing: { color: '#3B82F6', bg: 'bg-blue-500/10', text: 'text-blue-400', icon: RefreshCw },
    shipped: { color: '#8B5CF6', bg: 'bg-purple-500/10', text: 'text-purple-400', icon: Truck },
    delivered: { color: '#10B981', bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: CheckCircle2 },
    cancelled: { color: '#EF4444', bg: 'bg-red-500/10', text: 'text-red-400', icon: XCircle },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Orders</h3>
          <p className="text-sm text-slate-400 mt-1">{filtered.length} total orders</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((order, i) => {
          const config = statusConfig[order.status] || statusConfig.pending;
          const StatusIcon = config.icon;
          return (
            <FloatingElement key={order.id} delay={i * 0.05} amplitude={4} duration={3 + Math.random()}>
              <Card3D glowColor={`${config.color}33`} depth={15}>
                <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-white/10 p-5 hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${config.color}15` }}>
                        <ShoppingBag className="w-6 h-6" style={{ color: config.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Order #{order.id.slice(-8)}</p>
                        <p className="text-xs text-slate-400">{order.userName || `User: ${order.userId.slice(-8)}`}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${config.bg} ${config.text}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">{item.name} x{item.quantity}</span>
                        <span className="text-white font-medium">PHP {item.price.toLocaleString()}</span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-xs text-slate-600">+{order.items.length - 3} more items</p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      {order.paymentMethod && <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" />{order.paymentMethod}</span>}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-white">PHP {order.total.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-500">{order.createdAt?.toDate?.() ? order.createdAt.toDate().toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </Card3D>
            </FloatingElement>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <FloatingElement amplitude={8} duration={4}>
            <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          </FloatingElement>
          <p className="text-slate-500 text-lg font-medium">No orders found</p>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  NOTIFICATIONS PANEL
// ═══════════════════════════════════════════════════════════════════════════════

const NotificationsPanel: React.FC<{
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}> = ({ notifications, onClose, onMarkRead, onMarkAllRead }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  const typeConfig = {
    order: { color: '#3B82F6', icon: ShoppingBag },
    appointment: { color: '#F59E0B', icon: Calendar },
    user: { color: '#8B5CF6', icon: Users },
    system: { color: '#10B981', icon: Cog },
    alert: { color: '#EF4444', icon: AlertCircle },
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-l border-white/10 shadow-2xl z-50 flex flex-col"
      style={{ animation: 'slideInRight 0.3s ease-out' }}>
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-white">Notifications</h3>
          <p className="text-xs text-slate-400 mt-1">{unreadCount} unread</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button onClick={onMarkAllRead} className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Mark all read
            </button>
          )}
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notifications.map((notif, i) => {
          const config = typeConfig[notif.type];
          const TypeIcon = config.icon;
          return (
            <div
              key={notif.id}
              onClick={() => onMarkRead(notif.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                notif.read
                  ? 'bg-white/[0.02] border-white/5'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              style={{ animation: `fadeInUp 0.3s ease-out ${i * 0.05}s both` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${config.color}15` }}>
                  <TypeIcon className="w-5 h-5" style={{ color: config.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">{notif.title}</p>
                    {!notif.read && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{notif.message}</p>
                  <p className="text-[10px] text-slate-600 mt-2">
                    {notif.createdAt?.toDate?.() ? notif.createdAt.toDate().toLocaleString() : 'Just now'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  DASHBOARD HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const DashboardHero: React.FC<{
  stats: DashboardStats;
  shopInfo: ShopInfo | null;
  onNavigate: (screen: ScreenType) => void;
}> = ({ stats, shopInfo, onNavigate }) => {
  const cards = [
    {
      label: 'Products',
      value: stats.totalProducts,
      icon: Package,
      color: '#3B82F6',
      screen: 'products' as ScreenType,
      subtitle: `${stats.lowStockCount} low stock`,
      trend: '+5.2%',
      trendUp: true,
    },
    {
      label: 'Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: '#8B5CF6',
      screen: 'orders' as ScreenType,
      subtitle: `${stats.pendingOrders} pending`,
      trend: '+12.8%',
      trendUp: true,
    },
    {
      label: 'Users',
      value: stats.totalUsers,
      icon: Users,
      color: '#10B981',
      screen: 'users' as ScreenType,
      subtitle: 'Active this month',
      trend: '+3.1%',
      trendUp: true,
    },
    {
      label: 'Appointments',
      value: stats.totalAppointments,
      icon: Calendar,
      color: '#F59E0B',
      screen: 'appointments' as ScreenType,
      subtitle: `${stats.pendingAppointments} pending`,
      trend: '-2.4%',
      trendUp: false,
    },
    {
      label: 'Revenue',
      value: stats.totalRevenue,
      icon: DollarSign,
      color: '#EC4899',
      screen: 'analytics' as ScreenType,
      subtitle: 'Total lifetime',
      trend: '+18.7%',
      trendUp: true,
      prefix: 'PHP ',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-950/90" />
        <ParticleField color="rgba(59,130,246,0.3)" density={30} />
        <div className="relative z-10 p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Live Dashboard</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Admin</span>
              </h2>
              <p className="text-slate-400 mt-2 max-w-lg">
                Managing <span className="text-white font-semibold">{shopInfo?.shopName || 'AutoFix Marketplace'}</span>. Here's what's happening today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-500">Today's Revenue</p>
                <p className="text-2xl font-black text-white">
                  PHP <AnimatedCounter value={stats.dailyRevenue} />
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                <TrendingUp className="w-7 h-7 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card, i) => (
          <FloatingElement key={card.label} delay={i * 0.1} amplitude={6} duration={3 + i * 0.3}>
            <Card3D glowColor={`${card.color}30`} depth={20} onClick={() => onNavigate(card.screen)}>
              <div className="h-full rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-white/10 backdrop-blur-xl p-5 shadow-2xl shadow-black/40 hover:border-white/20 transition-all group cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                    <card.icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${card.trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
                    {card.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {card.trend}
                  </div>
                </div>
                <p className="text-2xl font-black text-white tracking-tight">
                  {card.prefix}{<AnimatedCounter value={card.value} />}
                </p>
                <p className="text-sm text-slate-400 mt-1 font-medium">{card.label}</p>
                <p className="text-xs text-slate-600 mt-1">{card.subtitle}</p>
                <div className="mt-3 flex items-center text-xs text-slate-600 group-hover:text-blue-400 transition-colors">
                  <span className="font-medium">View Details</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card3D>
          </FloatingElement>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN ADMIN DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

type ScreenType = 'dashboard' | 'products' | 'users' | 'appointments' | 'analytics' | 'shop-info' | 'orders';

export const AdminDashboard: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0, totalUsers: 0, totalAppointments: 0, totalOrders: 0,
    totalRevenue: 0, monthlyRevenue: 0, weeklyRevenue: 0, dailyRevenue: 0,
    lowStockCount: 0, outOfStockCount: 0, pendingOrders: 0, pendingAppointments: 0,
    conversionRate: 0, avgOrderValue: 0, topCategory: '',
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [shopInfoModalOpen, setShopInfoModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: '1', title: 'New Order', message: 'Order #12345 received from John Doe', type: 'order', read: false, createdAt: { toDate: () => new Date() } },
    { id: '2', title: 'Low Stock Alert', message: 'Heavy-Duty Hitch Receiver is running low', type: 'alert', read: false, createdAt: { toDate: () => new Date(Date.now() - 3600000) } },
    { id: '3', title: 'New User', message: 'Sarah Smith just registered', type: 'user', read: true, createdAt: { toDate: () => new Date(Date.now() - 7200000) } },
    { id: '4', title: 'Appointment Confirmed', message: 'Service appointment for tomorrow at 2PM', type: 'appointment', read: true, createdAt: { toDate: () => new Date(Date.now() - 86400000) } },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Real-time listeners
  useEffect(() => {
    setLoading(true);
    const productsQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubProducts = onSnapshot(productsQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(data);
      const lowStock = data.filter(p => p.stockStatus === 'FEW_LEFT').length;
      const outOfStock = data.filter(p => p.stockStatus === 'OUT_OF_STOCK').length;
      const revenue = data.reduce((sum, p) => sum + ((p.price || 0) * (p.reviewCount || 0)), 0);
      const categories: Record<string, number> = {};
      data.forEach(p => { categories[p.category] = (categories[p.category] || 0) + 1; });
      const topCat = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
      setStats(prev => ({
        ...prev, totalProducts: data.length, lowStockCount: lowStock,
        outOfStockCount: outOfStock, totalRevenue: revenue, topCategory: topCat,
      }));
      setLoading(false);
    }, () => setLoading(false));

    const unsubUsers = onSnapshot(collection(db, 'users_web'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
      setUsers(data);
      setStats(prev => ({ ...prev, totalUsers: data.length }));
    });

    const unsubAppointments = onSnapshot(collection(db, 'appointments'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(data);
      const pending = data.filter(a => a.status === 'pending').length;
      setStats(prev => ({ ...prev, totalAppointments: data.length, pendingAppointments: pending }));
    });

    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
      setOrders(data);
      const pending = data.filter(o => o.status === 'pending').length;
      const totalRev = data.reduce((sum, o) => sum + (o.total || 0), 0);
      const avgOrder = data.length > 0 ? totalRev / data.length : 0;
      setStats(prev => ({
        ...prev, totalOrders: data.length, pendingOrders: pending,
        totalRevenue: totalRev, avgOrderValue: avgOrder,
        monthlyRevenue: totalRev * 0.3, weeklyRevenue: totalRev * 0.1, dailyRevenue: totalRev * 0.02,
        conversionRate: data.length > 0 ? (data.filter(o => o.status === 'delivered').length / data.length) * 100 : 0,
      }));
    });

    const unsubShopInfo = onSnapshot(doc(db, 'shop_info', 'main'), (docSnap) => {
      if (docSnap.exists()) setShopInfo({ id: docSnap.id, ...docSnap.data() } as ShopInfo);
    });

    return () => {
      unsubProducts(); unsubUsers(); unsubAppointments(); unsubOrders(); unsubShopInfo();
    };
  }, []);

  const uploadImage = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSaveProduct = async (productData: Partial<Product>, imageFile?: File) => {
    try {
      let imageUrl = productData.imageUrl || '';
      if (imageFile) imageUrl = await uploadImage(imageFile, `products/${Date.now()}_${imageFile.name}`);
      const data = { ...productData, imageUrl, updatedAt: serverTimestamp() };
      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), data);
        showNotification('Product updated successfully!');
      } else {
        await addDoc(collection(db, 'products'), { ...data, createdAt: serverTimestamp() });
        showNotification('Product added successfully!');
      }
      setProductModalOpen(false); setEditingProduct(null);
    } catch (err) { console.error(err); showNotification('Error saving product', 'error'); }
  };

  const handleDeleteProduct = async (id: string) => {
    try { await deleteDoc(doc(db, 'products', id)); showNotification('Product deleted!'); setDeleteConfirmId(null); }
    catch (err) { showNotification('Error deleting product', 'error'); }
  };

  const handleSaveShopInfo = async (infoData: Partial<ShopInfo>, logoFile?: File, bannerFile?: File) => {
    try {
      let logoUrl = infoData.logoUrl || '';
      let bannerUrl = infoData.bannerUrl || '';
      if (logoFile) logoUrl = await uploadImage(logoFile, `shop/logo_${Date.now()}_${logoFile.name}`);
      if (bannerFile) bannerUrl = await uploadImage(bannerFile, `shop/banner_${Date.now()}_${bannerFile.name}`);
      await setDoc(doc(db, 'shop_info', 'main'), { ...infoData, logoUrl, bannerUrl, updatedAt: serverTimestamp() }, { merge: true });
      showNotification('Shop information updated!'); setShopInfoModalOpen(false);
    } catch (err) { showNotification('Error saving shop info', 'error'); }
  };

  const handleEditProduct = (product: Product) => { setEditingProduct(product); setProductModalOpen(true); };
  const handleAddProduct = () => { setEditingProduct(null); setProductModalOpen(true); };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          <div className="absolute inset-2 border-4 border-cyan-500/20 rounded-full" />
          <div className="absolute inset-2 border-4 border-t-transparent border-r-cyan-500 border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        <p className="text-slate-400 font-medium animate-pulse">Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Particle Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-6 right-6 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideIn backdrop-blur-xl border ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Notifications Panel */}
      {notificationsPanelOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setNotificationsPanelOpen(false)} />
          <NotificationsPanel
            notifications={notifications}
            onClose={() => setNotificationsPanelOpen(false)}
            onMarkRead={markNotificationRead}
            onMarkAllRead={markAllRead}
          />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Cog className="w-6 h-6 text-white animate-spin-slow" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight">
                  AutoFix <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Admin</span>
                </h1>
                <p className="text-slate-500 text-sm font-medium mt-0.5">Business Owner Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-400 font-mono">
                  {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Live</span>
              </div>
              <button
                onClick={() => setNotificationsPanelOpen(true)}
                className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <Bell className="w-5 h-5 text-slate-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                <Settings className="w-5 h-5 text-slate-400 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products, users, orders, appointments..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Content */}
        {currentScreen === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            <DashboardHero stats={stats} shopInfo={shopInfo} onNavigate={setCurrentScreen} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Products */}
              <div className="lg:col-span-2">
                <Card3D glowColor="rgba(59,130,246,0.1)" depth={10}>
                  <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-white">Recent Products</h3>
                        <p className="text-xs text-slate-400">Latest additions to inventory</p>
                      </div>
                      <button onClick={() => setCurrentScreen('products')} className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                        View All <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {products.slice(0, 5).map((product, i) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                          onClick={() => handleEditProduct(product)}
                          style={{ animation: `fadeInUp 0.3s ease-out ${i * 0.05}s both` }}
                        >
                          <div className="w-14 h-14 rounded-xl bg-slate-700/50 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                            {product.imageUrl ? <img src={product.imageUrl} alt="" className="w-full h-full object-cover" /> : <Package className="w-6 h-6 text-slate-600" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">{product.name}</p>
                            <p className="text-xs text-slate-400">{product.brand} &middot; {product.category}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-white">PHP {product.price.toLocaleString()}</p>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                              product.stockStatus === 'IN_STOCK' ? 'bg-emerald-500/10 text-emerald-400' :
                              product.stockStatus === 'FEW_LEFT' ? 'bg-amber-500/10 text-amber-400' :
                              'bg-red-500/10 text-red-400'
                            }`}>
                              {product.stockStatus === 'IN_STOCK' ? 'In Stock' : product.stockStatus === 'FEW_LEFT' ? 'Few Left' : 'Out'}
                            </span>
                          </div>
                        </div>
                      ))}
                      {products.length === 0 && (
                        <div className="text-center py-8">
                          <Package className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                          <p className="text-slate-500">No products yet. Add your first product!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card3D>
              </div>

              {/* Shop Info & Quick Actions */}
              <div className="space-y-6">
                <Card3D glowColor="rgba(16,185,129,0.1)" depth={10}>
                  <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-white">Shop Info</h3>
                        <p className="text-xs text-slate-400">Branding & contact details</p>
                      </div>
                      <button onClick={() => setShopInfoModalOpen(true)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <Edit3 className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden border border-white/10">
                          {shopInfo?.logoUrl ? <img src={shopInfo.logoUrl} alt="Logo" className="w-full h-full object-cover" /> : <Store className="w-7 h-7 text-blue-400" />}
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">{shopInfo?.shopName || 'AutoFix Marketplace'}</p>
                          <p className="text-xs text-slate-400">{shopInfo?.tagline || 'Premium Auto Parts'}</p>
                        </div>
                      </div>
                      <div className="space-y-2 pt-2">
                        {shopInfo?.contactPhone && <div className="flex items-center gap-2 text-xs text-slate-400"><Phone className="w-3.5 h-3.5 text-slate-500" />{shopInfo.contactPhone}</div>}
                        {shopInfo?.contactEmail && <div className="flex items-center gap-2 text-xs text-slate-400"><Mail className="w-3.5 h-3.5 text-slate-500" />{shopInfo.contactEmail}</div>}
                        {shopInfo?.address && <div className="flex items-center gap-2 text-xs text-slate-400"><MapPin className="w-3.5 h-3.5 text-slate-500" />{shopInfo.address}</div>}
                        {shopInfo?.businessHours && <div className="flex items-center gap-2 text-xs text-slate-400"><Clock className="w-3.5 h-3.5 text-slate-500" />{shopInfo.businessHours}</div>}
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: shopInfo?.accentColor || '#3B82F6' }} />
                        <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: shopInfo?.secondaryColor || '#8B5CF6' }} />
                        <span className="text-xs text-slate-500">Theme Colors</span>
                      </div>
                    </div>
                  </div>
                </Card3D>

                {/* Quick Actions */}
                <Card3D glowColor="rgba(245,158,11,0.1)" depth={10}>
                  <div className="rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-white/10 p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={handleAddProduct} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-left group">
                        <Plus className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-xs font-semibold text-white">Add Product</p>
                        <p className="text-[10px] text-slate-500">New inventory item</p>
                      </button>
                      <button onClick={() => setCurrentScreen('analytics')} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-left group">
                        <BarChart3 className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-xs font-semibold text-white">Analytics</p>
                        <p className="text-[10px] text-slate-500">View reports</p>
                      </button>
                      <button onClick={() => setCurrentScreen('orders')} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-left group">
                        <ShoppingBag className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-xs font-semibold text-white">Orders</p>
                        <p className="text-[10px] text-slate-500">Manage orders</p>
                      </button>
                      <button onClick={() => setCurrentScreen('shop-info')} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-left group">
                        <Store className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-xs font-semibold text-white">Shop Info</p>
                        <p className="text-[10px] text-slate-500">Edit branding</p>
                      </button>
                    </div>
                  </div>
                </Card3D>
              </div>
            </div>
          </div>
        )}

        {/* Detail Screens */}
        {currentScreen !== 'dashboard' && (
          <div className="animate-fadeIn space-y-6">
            <button onClick={() => setCurrentScreen('dashboard')} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group">
              <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
            {currentScreen === 'products' && <ProductsScreen products={products} onAdd={handleAddProduct} onEdit={handleEditProduct} onDelete={(id) => setDeleteConfirmId(id)} searchQuery={searchQuery} />}
            {currentScreen === 'users' && <UsersScreen users={users} searchQuery={searchQuery} />}
            {currentScreen === 'appointments' && <AppointmentsScreen appointments={appointments} searchQuery={searchQuery} />}
            {currentScreen === 'orders' && <OrdersScreen orders={orders} searchQuery={searchQuery} />}
            {currentScreen === 'analytics' && <AnalyticsScreen stats={stats} products={products} />}
            {currentScreen === 'shop-info' && (
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-white tracking-tight">Shop Information</h3>
                  <p className="text-sm text-slate-400">Edit your shop branding and contact details</p>
                </div>
                <ShopInfoForm shopInfo={shopInfo} onSave={handleSaveShopInfo} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Modal */}
      <Modal3D
        isOpen={productModalOpen}
        onClose={() => { setProductModalOpen(false); setEditingProduct(null); }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        icon={<Package className="w-5 h-5 text-blue-400" />}
      >
        <ProductForm product={editingProduct || undefined} onSave={handleSaveProduct} onCancel={() => { setProductModalOpen(false); setEditingProduct(null); }} />
      </Modal3D>

      {/* Shop Info Modal */}
      <Modal3D
        isOpen={shopInfoModalOpen}
        onClose={() => setShopInfoModalOpen(false)}
        title="Edit Shop Information"
        icon={<Store className="w-5 h-5 text-emerald-400" />}
      >
        <ShopInfoForm shopInfo={shopInfo} onSave={handleSaveShopInfo} />
      </Modal3D>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <Modal3D isOpen={true} onClose={() => setDeleteConfirmId(null)} title="Confirm Delete" maxWidth="max-w-md" icon={<AlertCircle className="w-5 h-5 text-red-400" />}>
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <Trash2 className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-white font-bold text-lg mb-2">Delete this product?</p>
            <p className="text-sm text-slate-400 mb-8 max-w-sm mx-auto">This action cannot be undone. The product will be permanently removed from the store and all associated data will be lost.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-slate-400 font-semibold hover:bg-white/5 hover:text-white transition-all">Cancel</button>
              <button onClick={() => handleDeleteProduct(deleteConfirmId)} className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <Trash2 className="w-4 h-4 inline mr-2" />Delete Product
              </button>
            </div>
          </div>
        </Modal3D>
      )}

      {/* Global Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(var(--float-amplitude, -10px)); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glitch {
          0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
          20% { clip-path: inset(92% 0 1% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(43% 0 1% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, 2px); }
          100% { clip-path: inset(58% 0 43% 0); transform: translate(2px, -2px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-slideIn { animation: slideIn 0.4s ease-out; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
};

export default AdminDashboard;