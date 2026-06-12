'use client';

import React from 'react';
import { Shield, Lock, Check, User, Search, Settings, Mail, Terminal } from 'lucide-react';

export function EmployeesPreview() {
  const employees = [
    { name: 'Sarah Chen', role: 'Lead Designer', dept: 'Design', initial: 'SC', bg: 'bg-[#ff6bcb]/10 text-[#ff6bcb]', active: true },
    { name: 'James Lee', role: 'Staff Engineer', dept: 'Eng', initial: 'JL', bg: 'bg-[#7a5cff]/10 text-[#7a5cff]', active: true },
    { name: 'Maria Santos', role: 'VP Product', dept: 'Product', initial: 'MS', bg: 'bg-[#6affe0]/10 text-[#6affe0]', active: false }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between text-[11px] font-sans p-1 text-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-2">
        <span className="font-semibold text-neutral-905 font-sans">Employees (48)</span>
        <div className="flex items-center gap-1 bg-neutral-50 border border-neutral-200/80 rounded-md px-1.5 py-0.5 text-[9px] text-neutral-400">
          <Search size={10} />
          <span>Search...</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 justify-center">
        {employees.map((emp) => (
          <div key={emp.name} className="flex items-center justify-between bg-neutral-50/50 p-1.5 rounded-lg border border-neutral-100/80">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] ${emp.bg}`}>
                {emp.initial}
              </div>
              <div className="text-left">
                <div className="font-medium text-neutral-900 leading-none">{emp.name}</div>
                <div className="text-[9px] text-neutral-400 mt-0.5">{emp.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-500 text-[8px] font-mono">{emp.dept}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${emp.active ? 'bg-[#27c93f]' : 'bg-neutral-300'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UsersPreview() {
  const roles = [
    { name: 'Admin', read: true, write: true, delete: true },
    { name: 'Manager', read: true, write: true, delete: false },
    { name: 'Developer', read: true, write: false, delete: false },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between text-[11px] font-sans p-1 text-neutral-800">
      <div className="flex items-center gap-1.5 border-b border-neutral-100 pb-2 mb-2">
        <Shield size={12} className="text-[#6affe0]" />
        <span className="font-semibold text-neutral-909 font-sans">Access Matrix</span>
      </div>

      <div className="flex-1 flex flex-col gap-1.5 justify-center">
        <div className="grid grid-cols-4 text-[9px] font-bold text-neutral-400 uppercase tracking-wider pb-1 border-b border-neutral-100">
          <div>Role</div>
          <div className="text-center">Read</div>
          <div className="text-center">Write</div>
          <div className="text-center">Delete</div>
        </div>

        {roles.map((r) => (
          <div key={r.name} className="grid grid-cols-4 items-center py-1 border-b border-neutral-50 last:border-0">
            <div className="font-semibold text-neutral-800 text-[10px]">{r.name}</div>
            <div className="flex justify-center">
              {r.read ? <Check size={11} className="text-[#27c93f]" /> : <Lock size={10} className="text-neutral-300" />}
            </div>
            <div className="flex justify-center">
              {r.write ? <Check size={11} className="text-[#27c93f]" /> : <Lock size={10} className="text-neutral-300" />}
            </div>
            <div className="flex justify-center">
              {r.delete ? <Check size={11} className="text-[#27c93f]" /> : <Lock size={10} className="text-neutral-300" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsPreview() {
  return (
    <div className="w-full h-full flex gap-3 text-[11px] font-sans p-0.5 text-neutral-800">
      {/* Sidebar mockup */}
      <div className="w-1/3 border-r border-neutral-100 pr-2 flex flex-col gap-1 text-[9px] text-neutral-400 font-medium">
        <div className="px-1.5 py-1 bg-neutral-100 text-neutral-800 rounded font-semibold flex items-center gap-1">
          <Settings size={10} /> General
        </div>
        <div className="px-1.5 py-1 flex items-center gap-1 hover:text-neutral-700">
          <User size={10} /> Members
        </div>
        <div className="px-1.5 py-1 flex items-center gap-1 hover:text-neutral-700">
          <Lock size={10} /> Security
        </div>
      </div>

      {/* Main settings mockup */}
      <div className="flex-1 flex flex-col justify-between text-left">
        <div>
          <div className="font-semibold text-neutral-900 mb-2 font-sans">Workspace Settings</div>
          <div className="flex flex-col gap-1 mb-2">
            <label className="text-[8px] text-neutral-400 font-bold uppercase">Workspace URL</label>
            <div className="px-1.5 py-1 border border-neutral-200 rounded-md text-[10px] bg-neutral-50/50 text-neutral-600 truncate font-mono">
              acme.manatech.com
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[8px] text-neutral-400 font-bold uppercase">Primary Theme</label>
            <div className="flex gap-1.5 items-center">
              <span className="w-3 h-3 rounded-full bg-[#b6ff3c] border border-neutral-300" />
              <span className="w-3 h-3 rounded-full bg-[#6affe0] border border-neutral-300" />
              <span className="w-3 h-3 rounded-full bg-[#ff6bcb] border border-neutral-300" />
              <span className="w-3 h-3 rounded-full bg-[#7a5cff] border border-neutral-300" />
            </div>
          </div>
        </div>

        <button className="w-full bg-[#b6ff3c] hover:bg-[#a5e634] text-neutral-900 border border-neutral-300/60 font-semibold py-1 rounded-md text-[9px] shadow-sm transition-colors mt-1">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export function AuditLogPreview() {
  const logs = [
    { title: 'SSO config updated', meta: 'Alex K. · 2m ago', type: 'security', color: 'text-[#ffb547] bg-[#ffb547]/10 border-[#ffb547]/20' },
    { title: 'API key secret created', meta: 'System · 15m ago', type: 'api', color: 'text-[#6affe0] bg-[#6affe0]/10 border-[#6affe0]/20' },
    { title: 'Failed login (mfa)', meta: '192.168.1.1 · 1h ago', type: 'auth', color: 'text-[#ff5e7e] bg-[#ff5e7e]/10 border-[#ff5e7e]/20' }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between text-[11px] font-sans p-1 text-neutral-800">
      <div className="flex items-center gap-1.5 border-b border-neutral-100 pb-2 mb-2">
        <Terminal size={12} className="text-neutral-400" />
        <span className="font-semibold text-neutral-900 font-sans">Live Activity Audit</span>
      </div>

      <div className="flex-1 flex flex-col gap-2 justify-center font-mono">
        {logs.map((log, i) => (
          <div key={i} className="flex items-start justify-between bg-neutral-50/50 p-1.5 rounded-lg border border-neutral-100/50">
            <div className="text-left">
              <div className="font-medium text-neutral-800 text-[9px] leading-tight">{log.title}</div>
              <div className="text-[8px] text-neutral-400 mt-0.5">{log.meta}</div>
            </div>
            <span className={`px-1 rounded text-[7px] font-bold uppercase border tracking-wider scale-90 ${log.color}`}>
              {log.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AuthSuitePreview() {
  return (
    <div className="w-full h-full flex flex-col justify-between text-[11px] font-sans p-1.5 text-neutral-800 max-w-[200px] mx-auto">
      <div className="text-center mb-1">
        <div className="font-bold text-neutral-900 text-xs font-sans">Sign In</div>
        <div className="text-[8px] text-neutral-400 mt-0.5">Welcome back to ManaTech</div>
      </div>

      <div className="flex-1 flex flex-col gap-2 justify-center">
        {/* Email Field */}
        <div className="flex flex-col gap-0.5 text-left">
          <label className="text-[8px] text-neutral-400 font-bold uppercase">Email</label>
          <div className="flex items-center gap-1 px-1.5 py-0.5 border border-neutral-200 rounded-md text-[9px] bg-neutral-50/50">
            <Mail size={10} className="text-neutral-300" />
            <span className="text-neutral-400 truncate">name@company.com</span>
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-0.5 text-left">
          <label className="text-[8px] text-neutral-400 font-bold uppercase">Password</label>
          <div className="flex items-center gap-1 px-1.5 py-0.5 border border-neutral-200 rounded-md text-[9px] bg-neutral-50/50">
            <Lock size={10} className="text-neutral-300" />
            <span className="text-neutral-300 font-sans">••••••••</span>
          </div>
        </div>

        {/* Login Button */}
        <button className="w-full bg-[#7a5cff] hover:bg-[#6849eb] text-white font-semibold py-1 rounded-md text-[9px] shadow-sm transition-colors">
          Continue with Email
        </button>
      </div>
    </div>
  );
}
