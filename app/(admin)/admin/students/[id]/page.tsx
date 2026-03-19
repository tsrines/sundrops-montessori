'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FilePlus } from 'lucide-react';
import { api } from '@/lib/api-client';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';

interface StudentDetail {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  campusSlug: string;
  programSlug: string;
  classroom: string | null;
  sessionType: string;
  enrollmentStatus: string;
  parent: {
    id: string;
    name: string;
    email: string;
    profile: {
      phone: string | null;
      address: string | null;
      city: string | null;
      state: string | null;
      zip: string | null;
      emergencyContactName: string | null;
      emergencyContactPhone: string | null;
    } | null;
  };
}

interface StudentIncident {
  id: string;
  incidentDate: string;
  severity: string;
  status: string;
  description: string;
  parentNotified: boolean;
  parentAcknowledged: boolean;
}

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [incidents, setIncidents] = useState<StudentIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api.get<{ student: StudentDetail }>(`/api/admin/students/${id}`),
      api.get<{ incidents: StudentIncident[] }>(`/api/admin/incidents?childId=${id}`),
    ])
      .then(([studentRes, incidentsRes]) => {
        setStudent(studentRes.student);
        setIncidents(incidentsRes.incidents);
      })
      .catch(() => setError('Failed to load student'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!student) {
    return <div className="py-12 text-center text-muted-foreground">{error || 'Student not found'}</div>;
  }

  const profile = student.parent.profile;
  const hasAddress = profile?.address || profile?.city || profile?.state;
  const hasEmergencyContact = profile?.emergencyContactName || profile?.emergencyContactPhone;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/students">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-serif text-2xl font-semibold">
            {student.firstName} {student.lastName}
          </h1>
          <p className="mt-1 text-sm capitalize text-muted-foreground">
            {student.campusSlug.replace(/-/g, ' ')} &middot; {student.programSlug.replace(/-/g, ' ')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={student.enrollmentStatus} />
          <Link href={`/admin/incidents/new?childId=${student.id}`}>
            <Button size="sm" className="gap-2">
              <FilePlus className="h-4 w-4" />
              New Incident Report
            </Button>
          </Link>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-3 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Enrollment</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Classroom</dt>
              <dd>{student.classroom ?? <span className="text-muted-foreground">Unassigned</span>}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Session</dt>
              <dd className="capitalize">{student.sessionType.replace(/-/g, ' ')}</dd>
            </div>
            {student.dateOfBirth && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Date of Birth</dt>
                <dd>{new Date(student.dateOfBirth).toLocaleDateString()}</dd>
              </div>
            )}
          </dl>
        </section>

        <section className="space-y-3 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Parent / Guardian</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Name</dt>
              <dd>{student.parent.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>{student.parent.email}</dd>
            </div>
            {profile?.phone && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Phone</dt>
                <dd>{profile.phone}</dd>
              </div>
            )}
            {hasAddress && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Address</dt>
                <dd className="text-right">
                  {profile?.address && <span>{profile.address}</span>}
                  {(profile?.city || profile?.state) && (
                    <span className="block">
                      {[profile?.city, profile?.state].filter(Boolean).join(', ')}
                      {profile?.zip ? ` ${profile.zip}` : ''}
                    </span>
                  )}
                </dd>
              </div>
            )}
            {hasEmergencyContact && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Emergency Contact</dt>
                <dd className="text-right">
                  {profile?.emergencyContactName && <span>{profile.emergencyContactName}</span>}
                  {profile?.emergencyContactPhone && (
                    <span className="block text-muted-foreground">{profile.emergencyContactPhone}</span>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            Incident Reports{' '}
            {incidents.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">({incidents.length})</span>
            )}
          </h2>
        </div>

        {incidents.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">No incident reports for this student.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Severity
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Parent
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-2">
                      <Link href={`/admin/incidents/${incident.id}`} className="hover:underline">
                        {new Date(incident.incidentDate).toLocaleDateString()}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <StatusBadge status={incident.severity} />
                    </td>
                    <td className="px-4 py-2">
                      <StatusBadge status={incident.status} />
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {incident.parentNotified
                        ? incident.parentAcknowledged
                          ? 'Acknowledged'
                          : 'Notified'
                        : 'Not notified'}
                    </td>
                    <td className="max-w-xs truncate px-4 py-2 text-muted-foreground">{incident.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
